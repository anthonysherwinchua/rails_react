class Api::V1::CategoriesController < ApplicationController
  before_action :set_category, only: %i[show destroy]

  def index
    categories = Category.all.order(created_at: :desc)
    render json: categories
  end

  def create
    category = Category.new(category_params)
    if category.save
      render json: category, status: :created
    else
      render json: category.errors, status: :unprocessable_entity
    end
  end

  def show
    render json: @category
  end

  def destroy
    @category&.destroy
    render json: { message: 'Category deleted!' }, status: :no_content
  end

  private

  def set_category
    @category = Category.find(params[:id])
  end

  def category_params
    params.permit(:name)
  end
end
