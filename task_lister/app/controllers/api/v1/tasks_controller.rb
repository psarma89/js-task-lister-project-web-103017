class Api::V1::TasksController < ApplicationController

  def index
    @tasks = Task.all
    render json: @tasks
  end

  def create
    @task = Task.new(task_params)
    if @task.save
      render json: @task
    else
      render json: {errors: @task.errors.full_messages}, status: 422
    end
  end

  def destroy
    @task = Task.find(params[:id])
    if @task
      @task.destroy
      render json: {message: "List was succesfully deleted"}
    else
      render json: {errors: @task.errors.full_messages}, status: 422
    end
  end

  private

  def task_params
    params.require(:task).permit(:description, :priority, :list_id)
  end
end
