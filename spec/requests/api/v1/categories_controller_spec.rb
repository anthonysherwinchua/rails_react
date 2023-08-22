require 'rails_helper'

describe Api::V1::CategoriesController, type: :request do
  describe 'GET /api/v1/categories' do
    it 'responds with ok status' do
      create(:category)

      get api_v1_categories_path

      expect(response).to have_http_status :ok
      expect(response.body).to match_response_schema('categories', strict: true)
    end
  end

  describe 'GET /api/v1/categories/:id' do
    it 'responds with no_content status' do
      category = create(:category)

      get api_v1_category_path(category.id)

      expect(response).to have_http_status :ok
      expect(response.body).to match_response_schema('category', strict: true)
    end
  end

  describe 'POST /api/v1/categories' do
    context 'given valid params' do
      it 'responds with created status' do
        params = { name: 'Category #1000' }

        post api_v1_categories_path, params: params

        expect(response).to have_http_status :created
        expect(response.body).to match_response_schema('category', strict: true)
      end
    end

    context 'given invalid params' do
      it 'responds with unprocessable_entity status' do
        params = { name: '' }

        post api_v1_categories_path, params: params

        expect(response).to have_http_status :unprocessable_entity
      end
    end
  end

  describe 'DELETE /api/v1/categories/:id' do
    it 'responds with no_content status' do
      category = create(:category)

      delete api_v1_category_path(category.id)

      expect(response).to have_http_status :no_content
    end
  end
end