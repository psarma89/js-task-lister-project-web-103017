class Api::V1::ListsController < ApplicationController

  def index
    @lists = List.all
    render json: @lists
  end

  def create
    @list = List.new(list_params)
    if @list.save
      render json: @list
    else
      render json: {errors: @list.errors.full_messages}, status: 422
    end
  end

  def destroy
    @list = List.find(params[:id])
    if @list
      # Task.where(list_id: @list.id).destroy_all
      @list.destroy
      render json: {message: "List was succesfully deleted"}
    else
      render json: {errors: @list.errors.full_messages}, status: 422
    end
  end

  private

  def list_params
    params.require(:list).permit(:title)
  end
end
