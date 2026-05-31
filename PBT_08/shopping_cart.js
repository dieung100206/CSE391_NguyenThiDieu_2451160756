// shopping_cart.js

function createCart() {
    let items = [];
    let discount = 0;
    let fixedDiscount = 0;

    return {
        // Thêm sản phẩm
        addItem(product, quantity = 1) {
            const existingItem = items.find(
                item => item.id === product.id
            );

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                items.push({
                    ...product,
                    quantity
                });
            }
        },

        // Xóa sản phẩm
        removeItem(productId) {
            items = items.filter(
                item => item.id !== productId
            );
        },

        // Cập nhật số lượng
        updateQuantity(productId, newQuantity) {
            const item = items.find(
                item => item.id === productId
            );

            if (!item) return;

            if (newQuantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = newQuantity;
            }
        },

        // Tính tổng tiền
        getTotal() {
            let total = items.reduce(
                (sum, item) =>
                    sum + item.price * item.quantity,
                0
            );

            total -= total * discount;
            total -= fixedDiscount;

            return Math.max(total, 0);
        },

        // Áp dụng mã giảm giá
        applyDiscount(code) {
            discount = 0;
            fixedDiscount = 0;

            switch (code.toUpperCase()) {
                case "SALE10":
                    discount = 0.1;
                    break;

                case "SALE20":
                    discount = 0.2;
                    break;

                case "FREESHIP":
                    fixedDiscount = 30000;
                    break;

                default:
                    console.log("Mã giảm giá không hợp lệ!");
            }
        },

        // In giỏ hàng
        printCart() {
            console.log("\n===== GIỎ HÀNG =====");

            const tableData = items.map(item => ({
                ID: item.id,
                "Sản phẩm": item.name,
                "SL": item.quantity,
                "Đơn giá":
                    item.price.toLocaleString("vi-VN") + "đ",
                "Thành tiền":
                    (item.price * item.quantity)
                        .toLocaleString("vi-VN") + "đ"
            }));

            console.table(tableData);

            console.log(
                "Tổng cộng:",
                this.getTotal().toLocaleString("vi-VN") + "đ"
            );
        },

        // Tổng số lượng sản phẩm
        getItemCount() {
            return items.reduce(
                (sum, item) => sum + item.quantity,
                0
            );
        },

        // Xóa toàn bộ giỏ hàng
        clearCart() {
            items = [];
            discount = 0;
            fixedDiscount = 0;
        }
    };
}

// ===========================
// TEST
// ===========================

const cart = createCart();

cart.addItem(
    {
        id: 1,
        name: "iPhone 16",
        price: 25990000
    },
    1
);

cart.addItem(
    {
        id: 3,
        name: "AirPods Pro",
        price: 6990000
    },
    2
);

cart.addItem(
    {
        id: 1,
        name: "iPhone 16",
        price: 25990000
    },
    1
);

console.log("=== GIỎ HÀNG BAN ĐẦU ===");
cart.printCart();

cart.applyDiscount("SALE10");

console.log("\n=== SAU KHI GIẢM 10% ===");
cart.printCart();

console.log(
    "\nSố SP:",
    cart.getItemCount()
);

cart.removeItem(3);

console.log(
    "Sau xóa:",
    cart.getItemCount()
);

console.log("\n=== GIỎ HÀNG HIỆN TẠI ===");
cart.printCart();

cart.updateQuantity(1, 3);

console.log("\n=== CẬP NHẬT SỐ LƯỢNG ===");
cart.printCart();

cart.applyDiscount("FREESHIP");

console.log("\n=== FREESHIP ===");
cart.printCart();

cart.clearCart();

console.log("\n=== SAU KHI XÓA GIỎ HÀNG ===");
cart.printCart();