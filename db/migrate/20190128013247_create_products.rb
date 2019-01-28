class CreateProducts < ActiveRecord::Migration[5.2]
  def change
    create_table :products do |t|
      t.string  :title
      t.string  :color
      t.string  :size
      t.string  :product_shot
      t.float   :cost
      
      t.timestamps
    end
  end
end
