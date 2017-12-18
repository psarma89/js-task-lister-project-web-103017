class CreateTasks < ActiveRecord::Migration[5.1]
  def change
    create_table :tasks do |t|
      t.string :description
      t.string :priority
      t.string :list_id

      t.timestamps
    end
  end
end
