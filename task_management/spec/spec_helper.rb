require 'rails_helper'

RSpec.describe TasksController, type: :controller do
  let(:user) { create(:user) } # Assuming you have a User factory
  let(:task) { create(:task, user: user) } # Assuming you have a Task factory



  describe "GET #index" do
    it "returns a successful response" do
      get :index
      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body)).to eq([task.as_json])
    end
  end

  describe "POST #create" do
    context "with valid parameters" do
      let(:valid_params) { { task: { title: "New Task", description: "Task Description", due_date: Time.now + 1.day, status: "Pending" } } }

      it "creates a new task" do
        expect {
          post :create, params: valid_params
        }.to change(Task, :count).by(1)
        expect(response).to have_http_status(:created)
      end
    end

    context "with invalid parameters" do
      let(:invalid_params) { { task: { title: "", description: "", due_date: nil, status: "Pending" } } }

      it "does not create a new task" do
        expect {
          post :create, params: invalid_params
        }.to change(Task, :count).by(0)
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe "PATCH #update" do
    context "with valid parameters" do
      it "updates the task" do
        patch :update, params: { id: task.id, task: { title: "Updated Title" } }
        task.reload
        expect(task.title).to eq("Updated Title")
        expect(response).to have_http_status(:success)
      end
    end

    context "with invalid parameters" do
      it "does not update the task" do
        patch :update, params: { id: task.id, task: { title: "" } }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe "DELETE #destroy" do
    it "deletes the task" do
      task # Ensure the task is created
      expect {
        delete :destroy, params: { id: task.id }
      }.to change(Task, :count).by(-1)
      expect(response).to have_http_status(:no_content)
    end
  end
end
