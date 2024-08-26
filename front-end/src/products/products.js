import { Table, Button, Form, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import './products.css';

const Products = () => {
    const [product, setProduct] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name_product: '',
        details: '',
        estimate: ''
    });
    const [currentProduct, setCurrentProduct] = useState(null);

    useEffect(() => {
        axios.get('products')
            .then(res => {
                setProduct(res.data);
            })
            .catch(err => console.error("Error fetching products", err));
    }, []);

    const handleDelete = (id) => {
        axios.delete(`products/${id}`)
            .then(() => {
                setProduct(product.filter(item => item.id !== id));
            })
            .catch(err => console.error("Error deleting product", err));
    };

    const handleAddProduct = () => {
        axios.post('products', newProduct)
            .then(res => {
                setProduct([...product, res.data]);
                setShowAddModal(false);
            })
            .catch(err => console.error("Error adding product", err));
    };

    const handleEditProduct = () => {
        axios.put(`products/${currentProduct.id}`, currentProduct)
            .then(res => {
                const updatedProducts = product.map(item =>
                    item.id === currentProduct.id ? res.data : item
                );
                setProduct(updatedProducts);
                setShowEditModal(false);
            })
            .catch(err => console.error("Error editing product", err));
    };

    const openEditModal = (item) => {
        setCurrentProduct(item);
        setShowEditModal(true);
    };

    return (
        <>
            <Button onClick={() => setShowAddModal(true)}>Add Product</Button>
            <Table striped bordered hover className="products-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name Product</th>
                        <th>Details</th>
                        <th>Estimate</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {product.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name_product}</td>
                            <td>{item.details}</td>
                            <td>{item.estimate}</td>
                            <td>
                                <Button 
                                    variant="danger" 
                                    onClick={() => handleDelete(item.id)}
                                >
                                    Delete
                                </Button>
                                <Button 
                                    variant="warning" 
                                    onClick={() => openEditModal(item)}
                                    style={{ marginLeft: '10px' }}
                                >
                                    Edit
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal Add Product */}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formProductName">
                            <Form.Label>Name Product</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter product name" 
                                value={newProduct.name_product}
                                onChange={(e) => setNewProduct({...newProduct, name_product: e.target.value})}
                            />
                        </Form.Group>

                        <Form.Group controlId="formProductDetails">
                            <Form.Label>Details</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter details" 
                                value={newProduct.details}
                                onChange={(e) => setNewProduct({...newProduct, details: e.target.value})}
                            />
                        </Form.Group>

                        <Form.Group controlId="formProductEstimate">
                            <Form.Label>Estimate</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter estimate" 
                                value={newProduct.estimate}
                                onChange={(e) => setNewProduct({...newProduct, estimate: e.target.value})}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddProduct}>
                        Add Product
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal Edit Product */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {currentProduct && (
                        <Form>
                            <Form.Group controlId="formProductName">
                                <Form.Label>Name Product</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter product name" 
                                    value={currentProduct.name_product}
                                    onChange={(e) => setCurrentProduct({...currentProduct, name_product: e.target.value})}
                                />
                            </Form.Group>

                            <Form.Group controlId="formProductDetails">
                                <Form.Label>Details</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter details" 
                                    value={currentProduct.details}
                                    onChange={(e) => setCurrentProduct({...currentProduct, details: e.target.value})}
                                />
                            </Form.Group>

                            <Form.Group controlId="formProductEstimate">
                                <Form.Label>Estimate</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter estimate" 
                                    value={currentProduct.estimate}
                                    onChange={(e) => setCurrentProduct({...currentProduct, estimate: e.target.value})}
                                />
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleEditProduct}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Products;
