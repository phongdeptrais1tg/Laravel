<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
class ProductsController extends Controller
{
    //
    public function index()
    {
        $products = Product::all();
        return response()->json($products);

    }
    public function destroy($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $product->delete();

        return response()->json(['message' => 'Product deleted successfully']);
    }
    public function store(Request $request)
    {
        // Validate dữ liệu đầu vào
        $validatedData = $request->validate([
            'name_product' => 'required|string|max:255',
            'details' => 'nullable|string',
            'estimate' => 'nullable|string',
        ]);

        // Tạo sản phẩm mới
        $product = Product::create([
            'name_product' => $validatedData['name_product'],
            'details' => $validatedData['details'] ?? '',
            'estimate' => $validatedData['estimate'] ?? '',
        ]);

        // Trả về phản hồi JSON với sản phẩm mới
        return response()->json($product, 201);
        
    }
    public function update(Request $request, $id)
{
    // Tìm sản phẩm theo ID
    $product = Product::find($id);

    if (!$product) {
        return response()->json(['message' => 'Product not found'], 404);
    }

    // Validate dữ liệu đầu vào
    $validatedData = $request->validate([
        'name_product' => 'required|string|max:255',
        'details' => 'nullable|string',
        'estimate' => 'nullable|string',
    ]);

    // Cập nhật thông tin sản phẩm
    $product->update([
        'name_product' => $validatedData['name_product'],
        'details' => $validatedData['details'] ?? '',
        'estimate' => $validatedData['estimate'] ?? '',
    ]);

    // Trả về phản hồi JSON với sản phẩm đã cập nhật
    return response()->json($product);
}

}
