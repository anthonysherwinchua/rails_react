class Api::V1::CategoriesController < ApplicationController
  before_action :set_category, only: [:show, :destroy]

  def index
    categories = Category.all.order(created_at: :desc)
    # NOTE: this is only to show "fetching messsage" on the front end
    sleep([*0..2].sample)

    # NOTE: exchange the render to show
    render json: categories
    # render json: { error: 'Something went wrong. Please try again or contact the administrator.' }, status: :unprocessable_entity
  end

  def create
    category = Category.new(category_params)
    if category.save
      render json: category, status: :created
    else
      render json: category.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
    render json: ::CategorySerializer.new(@category).as_json
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
