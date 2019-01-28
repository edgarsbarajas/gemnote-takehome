Customer.destroy_all
Product.destroy_all

# I grabbed product image links from google rather than saving to the database to save time.
customers = [
  ["Starbucks", "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/intermediary/f/4ad36332-03b9-4804-aad7-acc8455a1109/d42twe0-39cf1623-3473-4045-af83-ac4fdee122ae.png"],
  ["Amazon", "https://metimegamer.files.wordpress.com/2014/11/amazon-logo.png?w=256"],
  ["Facebook", "https://www.vectorlogo.zone/logos/facebook/facebook-official.svg"],
  ["eBay", "http://www.myiconfinder.com/uploads/iconsets/256-256-f704a3a4a225d02969eb77d0c4eecb20-ebay.png"],
  ["Microsoft", "http://www.myiconfinder.com/uploads/iconsets/256-256-7ac0ea3f11c425cd8e7e1fdd0a2774e6-microsoft.png"],
  ["Google", "http://www.myiconfinder.com/uploads/iconsets/256-256-c14dd412f1a720d5ed340b79f3deb5c4-google.png"]
]

products = [
  ["T-shirt", "Blue", "Large", "http://image.marginup.com/u/u223/White%20T-Shirt-3.jpg", 9.99],
  ["Gloves", "Green", "Small", "https://www.jcrew.com/s7-img-facade/F7968_EG0650?fmt=jpeg&qlt=90,0&resMode=sharp&op_usm=.1,0,0,0&wid=636&hei=636", 5.99],
  ["Sweatshirt", "Yellow", "Medium", "https://target.scene7.com/is/image/Target/GUEST_681d2c08-5773-4032-95ff-568a285c87be" ,12.99],
  ["Shoes", "White", "10M", "https://assets.adidas.com/images/w_600,f_auto,q_auto/6c0013c196304c6688c2a9190170b9b6_9366/Harden_Vol__3_Shoes_Black_BB7723_05_standard.jpg", 149.99],
  ["Backpack", "Purple", "Standard", "https://cdn1.lasso-shoes.fr/730-large_default/backpack.jpg", 45.99]
]

customers.each do |name, logo|
  Customer.create(name: name, logo: logo)
end

products.each do |title, color, size, product_shot, cost|
  Product.create(title: title, color: color, size: size, product_shot: product_shot, cost: cost)
end
