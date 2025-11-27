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
  cartId: 789,
  userId: 456,
  items: [],
  summary: {
    totalItems: 0,
    totalquantity: 0,
    subtotal: 0,
    estimatedshipping: 0,
    estimatedtotal: 0,
  },
  updatedAt: new Date().toISOString(),
};

// Cache for generated products to maintain consistency
const productCache: Record<number, any> = {};

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper to recalculate cart summary
const recalculateSummary = () => {
  const totalItems = mockCart.items.length;
  const totalquantity = mockCart.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const subtotal = mockCart.items.reduce(
    (sum, item) => sum + item.lineTotal,
    0
  );
  const estimatedshipping = subtotal > 0 ? 50000 : 0; // Free shipping over certain amount
  const estimatedtotal = subtotal + estimatedshipping;

  mockCart.summary = {
    totalItems,
    totalquantity,
    subtotal,
    estimatedshipping,
    estimatedtotal,
  };
  mockCart.updatedAt = new Date().toISOString();
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
        inStock: true,
        maxQuantity: maxQty,
      };

      // Cache the product
      productCache[id] = product;
      return product;
    };

    // Use provided product info or generate mock
    let product;
    if (data.product_info) {
      product = {
        id: data.productId,
        name: data.product_info.name,
        slug: data.product_info.slug,
        sku: `WN-${data.productId.toString().padStart(4, "0")}`,
        image: data.product_info.image,
        price: data.product_info.price,
        inStock: true,
        maxQuantity: data.product_info.maxQuantity || 99,
      };
      // Cache it
      productCache[data.productId] = product;
    } else {
      product = getMockProduct(data.productId);
    }

    if (!product.inStock) {
      throw new Error("Sản phẩm đã hết hàng");
    }

    // Check if item already exists in cart
    const existingItemIndex = mockCart.items.findIndex(
      (item) => item.product.id === data.productId
    );

    let cartItemId: number;
    let newQuantity: number;

    if (existingItemIndex >= 0) {
      // Update existing item
      const existingItem = mockCart.items[existingItemIndex];
      newQuantity = existingItem.quantity + data.quantity;

      if (newQuantity > product.maxQuantity) {
        throw new Error(`Số lượng tối đa là ${product.maxQuantity}`);
      }

      existingItem.quantity = newQuantity;
      existingItem.lineTotal = existingItem.unitPrice * newQuantity;
      cartItemId = existingItem.id;
    } else {
      // Add new item
      cartItemId = mockCart.items.length + 1;
      newQuantity = data.quantity;

      if (newQuantity > product.maxQuantity) {
        throw new Error(`Số lượng tối đa là ${product.maxQuantity}`);
      }

      const newItem: CartItem = {
        id: cartItemId,
        product: {
          id: product.id,
          name: product.name,
          slug: product.slug,
          sku: product.sku,
          image: product.image,
          price: product.price,
          inStock: product.inStock,
          maxQuantity: product.maxQuantity,
        },
        quantity: newQuantity,
        unitPrice: product.price,
        lineTotal: product.price * newQuantity,
        added_at: new Date().toISOString(),
      };

      mockCart.items.push(newItem);
    }

    recalculateSummary();

    return {
      cartItemId,
      productId: data.productId,
      quantity: newQuantity,
      unitPrice: product.price,
      lineTotal: product.price * newQuantity,
    };
  },

  // Update cart item quantity
  async updateCartItem(
    cartItemId: number,
    data: UpdateCartItemRequest
  ): Promise<{ cartItemId: number; quantity: number; lineTotal: number }> {
    await delay(500);

    const itemIndex = mockCart.items.findIndex(
      (item) => item.id === cartItemId
    );
    if (itemIndex === -1) {
      throw new Error("Không tìm thấy sản phẩm trong giỏ hàng");
    }

    const item = mockCart.items[itemIndex];

    if (data.quantity <= 0) {
      throw new Error("Số lượng phải lớn hơn 0");
    }

    if (data.quantity > item.product.maxQuantity) {
      throw new Error(`Số lượng tối đa là ${item.product.maxQuantity}`);
    }

    item.quantity = data.quantity;
    item.lineTotal = item.unitPrice * data.quantity;

    recalculateSummary();

    return {
      cartItemId: cartItemId,
      quantity: data.quantity,
      lineTotal: item.lineTotal,
    };
  },

  // Remove item from cart
  async removeCartItem(cartItemId: number): Promise<void> {
    await delay(500);

    const itemIndex = mockCart.items.findIndex(
      (item) => item.id === cartItemId
    );
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
