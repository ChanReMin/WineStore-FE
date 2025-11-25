// Mock Cart Service
import type {
  Cart,
  CartItem,
  AddToCartRequest,
  AddToCartResponse,
  UpdateCartItemRequest,
} from "@/types/cart";

// Mock cart data
let mockCart: Cart = {
  cart_id: 789,
  user_id: 456,
  items: [],
  summary: {
    total_items: 0,
    total_quantity: 0,
    subtotal: 0,
    estimated_shipping: 0,
    estimated_total: 0,
  },
  updated_at: new Date().toISOString(),
};

// Cache for generated products to maintain consistency
const productCache: Record<number, any> = {};

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper to recalculate cart summary
const recalculateSummary = () => {
  const total_items = mockCart.items.length;
  const total_quantity = mockCart.items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = mockCart.items.reduce((sum, item) => sum + item.line_total, 0);
  const estimated_shipping = subtotal > 0 ? 50000 : 0; // Free shipping over certain amount
  const estimated_total = subtotal + estimated_shipping;

  mockCart.summary = {
    total_items,
    total_quantity,
    subtotal,
    estimated_shipping,
    estimated_total,
  };
  mockCart.updated_at = new Date().toISOString();
};

export const cartService = {
  // Get cart
  async getCart(): Promise<Cart> {
    await delay(500);
    return { ...mockCart };
  },

  // Add item to cart
  async addToCart(data: AddToCartRequest): Promise<AddToCartResponse> {
    await delay(600);

    // Mock product data - Generate dynamic product for any ID
    // In real app, this would fetch from product service
    const getMockProduct = (id: number) => {
      // Return cached product if exists
      if (productCache[id]) {
        return productCache[id];
      }

      // Generate new product
      const productNames = [
        "Château Margaux 2015",
        "Penfolds Grange 2016",
        "Dom Pérignon 2010",
        "Opus One 2018",
        "Screaming Eagle 2017",
        "Château Lafite Rothschild 2016",
        "Sassicaia 2019",
        "Tignanello 2018",
        "Vega Sicilia Único 2010",
        "Ridge Monte Bello 2017",
      ];
      
      const images = [
        "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400",
        "https://images.unsplash.com/photo-1586370434639-0fe43b2d32d6?w=400",
        "https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=400",
        "https://images.unsplash.com/photo-1566754436-d9e8c7e7e4e5?w=400",
        "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=400",
      ];

      const nameIndex = (id - 1) % productNames.length;
      const imageIndex = (id - 1) % images.length;
      
      // Use ID as seed for consistent random values
      const priceBase = 1000000 + ((id * 123456) % 5000000);
      const maxQty = 10 + ((id * 7) % 50);
      
      const product = {
        id,
        name: productNames[nameIndex],
        slug: productNames[nameIndex].toLowerCase().replace(/\s+/g, "-"),
        sku: `WN-${id.toString().padStart(4, "0")}`,
        image: images[imageIndex],
        price: priceBase,
        in_stock: true,
        max_quantity: maxQty,
      };

      // Cache the product
      productCache[id] = product;
      return product;
    };

    // Use provided product info or generate mock
    let product;
    if (data.product_info) {
      product = {
        id: data.product_id,
        name: data.product_info.name,
        slug: data.product_info.slug,
        sku: `WN-${data.product_id.toString().padStart(4, "0")}`,
        image: data.product_info.image,
        price: data.product_info.price,
        in_stock: true,
        max_quantity: data.product_info.max_quantity || 99,
      };
      // Cache it
      productCache[data.product_id] = product;
    } else {
      product = getMockProduct(data.product_id);
    }

    if (!product.in_stock) {
      throw new Error("Sản phẩm đã hết hàng");
    }

    // Check if item already exists in cart
    const existingItemIndex = mockCart.items.findIndex(
      (item) => item.product.id === data.product_id
    );

    let cart_item_id: number;
    let newQuantity: number;

    if (existingItemIndex >= 0) {
      // Update existing item
      const existingItem = mockCart.items[existingItemIndex];
      newQuantity = existingItem.quantity + data.quantity;

      if (newQuantity > product.max_quantity) {
        throw new Error(`Số lượng tối đa là ${product.max_quantity}`);
      }

      existingItem.quantity = newQuantity;
      existingItem.line_total = existingItem.unit_price * newQuantity;
      cart_item_id = existingItem.id;
    } else {
      // Add new item
      cart_item_id = mockCart.items.length + 1;
      newQuantity = data.quantity;

      if (newQuantity > product.max_quantity) {
        throw new Error(`Số lượng tối đa là ${product.max_quantity}`);
      }

      const newItem: CartItem = {
        id: cart_item_id,
        product: {
          id: product.id,
          name: product.name,
          slug: product.slug,
          sku: product.sku,
          image: product.image,
          price: product.price,
          in_stock: product.in_stock,
          max_quantity: product.max_quantity,
        },
        quantity: newQuantity,
        unit_price: product.price,
        line_total: product.price * newQuantity,
        added_at: new Date().toISOString(),
      };

      mockCart.items.push(newItem);
    }

    recalculateSummary();

    return {
      cart_item_id,
      product_id: data.product_id,
      quantity: newQuantity,
      unit_price: product.price,
      line_total: product.price * newQuantity,
    };
  },

  // Update cart item quantity
  async updateCartItem(
    cartItemId: number,
    data: UpdateCartItemRequest
  ): Promise<{ cart_item_id: number; quantity: number; line_total: number }> {
    await delay(500);

    const itemIndex = mockCart.items.findIndex((item) => item.id === cartItemId);
    if (itemIndex === -1) {
      throw new Error("Không tìm thấy sản phẩm trong giỏ hàng");
    }

    const item = mockCart.items[itemIndex];

    if (data.quantity <= 0) {
      throw new Error("Số lượng phải lớn hơn 0");
    }

    if (data.quantity > item.product.max_quantity) {
      throw new Error(`Số lượng tối đa là ${item.product.max_quantity}`);
    }

    item.quantity = data.quantity;
    item.line_total = item.unit_price * data.quantity;

    recalculateSummary();

    return {
      cart_item_id: cartItemId,
      quantity: data.quantity,
      line_total: item.line_total,
    };
  },

  // Remove item from cart
  async removeCartItem(cartItemId: number): Promise<void> {
    await delay(500);

    const itemIndex = mockCart.items.findIndex((item) => item.id === cartItemId);
    if (itemIndex === -1) {
      throw new Error("Không tìm thấy sản phẩm trong giỏ hàng");
    }

    mockCart.items.splice(itemIndex, 1);
    recalculateSummary();
  },

  // Clear cart
  async clearCart(): Promise<void> {
    await delay(500);

    mockCart.items = [];
    recalculateSummary();
  },
};
