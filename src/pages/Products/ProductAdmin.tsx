import { useState, useEffect } from "react";
import { type Product } from "../../types/Product";
import styles from "./ProductAdmin.module.css";
import { config } from "../../configuration/config";

function ProductAdmin() {
    const [productos, setProductos] = useState<Product[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState<Product>({
        nombre: "",
        descripcion: "",
        precio: 0,
        stock: 0,
        categoria: "",
        imagen: ""
    });

    const [editingId, setEditingId] = useState<number | null>(null);

    // Cargar productos desde json-server
    useEffect(() => {
        fetchProductos();
    }, []);

    const fetchProductos = async () => {
        console.log(`Haciendo fetch a la url ${config.apiBaseUrl}/products`);
        try {
            setCargando(true);
            const response = await fetch(`${config.apiBaseUrl}/products`);
            if (!response.ok) throw new Error('Error al cargar productos');
            const data = await response.json();
            setProductos(data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido');
        } finally {
            setCargando(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "precio" || name === "stock" ? parseFloat(value) || 0 : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.nombre || !formData.categoria || formData.precio <= 0) {
            alert("Por favor completa los campos requeridos");
            return;
        }

        try {
            if (editingId !== null) {
                // Editar producto existente
                const response = await fetch(`http://localhost:3000/products/${editingId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ...formData, id: editingId }),
                });

                if (!response.ok) throw new Error('Error al actualizar producto');

                setEditingId(null);
            } else {
                // Agregar nuevo producto
                const response = await fetch('http://localhost:3000/products', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (!response.ok) throw new Error('Error al agregar producto');
            }

            // Recargar productos
            await fetchProductos();

            // Limpiar formulario
            resetForm();
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Error al guardar producto');
        }
    };

    const handleEdit = (producto: Product) => {
        setFormData(producto);
        setEditingId(producto.id || null);
    };

    const handleDelete = async (id: number) => {
        if (confirm("¿Estás seguro de eliminar este producto?")) {
            try {
                const response = await fetch(`http://localhost:3000/products/${id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) throw new Error('Error al eliminar producto');

                // Recargar productos
                await fetchProductos();
            } catch (err) {
                alert(err instanceof Error ? err.message : 'Error al eliminar producto');
            }
        }
    };

    const resetForm = () => {
        setFormData({
            nombre: "",
            descripcion: "",
            precio: 0,
            stock: 0,
            categoria: "",
            imagen: ""
        });
        setEditingId(null);
    };

    const getStockClass = (stock: number) => {
        if (stock === 0) return styles.stockOut;
        if (stock < 10) return styles.stockLow;
        return styles.stock;
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Administración de Productos</h1>

            {error && (
                <div style={{
                    padding: '1rem',
                    backgroundColor: '#fee',
                    color: '#c00',
                    borderRadius: '8px',
                    marginBottom: '1rem',
                    textAlign: 'center'
                }}>
                    Error: {error}
                </div>
            )}

            {cargando ? (
                <div style={{ textAlign: 'center', padding: '3rem' }}>
                    <p>Cargando productos...</p>
                </div>
            ) : (
                <div className={styles.content}>
                    {/* Formulario */}
                    <div className={styles.formContainer}>
                        <h2 className={styles.formTitle}>
                            {editingId !== null ? "Editar Producto" : "Nuevo Producto"}
                        </h2>
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Nombre *</label>
                                <input
                                    type="text"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleInputChange}
                                    className={styles.input}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Descripción</label>
                                <textarea
                                    name="descripcion"
                                    value={formData.descripcion}
                                    onChange={handleInputChange}
                                    className={styles.textarea}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Precio *</label>
                                <input
                                    type="number"
                                    name="precio"
                                    value={formData.precio}
                                    onChange={handleInputChange}
                                    className={styles.input}
                                    step="0.01"
                                    min="0"
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Stock</label>
                                <input
                                    type="number"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleInputChange}
                                    className={styles.input}
                                    min="0"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Categoría *</label>
                                <select
                                    name="categoria"
                                    value={formData.categoria}
                                    onChange={handleInputChange}
                                    className={styles.select}
                                    required
                                >
                                    <option value="">Selecciona una categoría</option>
                                    <option value="Computadoras">Computadoras</option>
                                    <option value="Accesorios">Accesorios</option>
                                    <option value="Monitores">Monitores</option>
                                    <option value="Audio">Audio</option>
                                    <option value="Almacenamiento">Almacenamiento</option>
                                    <option value="Componentes">Componentes</option>
                                </select>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>URL Imagen</label>
                                <input
                                    type="url"
                                    name="imagen"
                                    value={formData.imagen}
                                    onChange={handleInputChange}
                                    className={styles.input}
                                    placeholder="https://..."
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Rating (0-5)</label>
                                <input
                                    type="number"
                                    name="rating"
                                    value={formData.rating || 0}
                                    onChange={handleInputChange}
                                    className={styles.input}
                                    step="0.1"
                                    min="0"
                                    max="5"
                                />
                            </div>

                            <div className={styles.buttonGroup}>
                                <button type="submit" className={`${styles.button} ${styles.buttonPrimary}`}>
                                    {editingId !== null ? "Actualizar" : "Agregar"}
                                </button>
                                {editingId !== null && (
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className={`${styles.button} ${styles.buttonSecondary}`}
                                    >
                                        Cancelar
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* Lista de productos */}
                    <div className={styles.listContainer}>
                        <h2 className={styles.listTitle}>
                            Lista de Productos ({productos.length})
                        </h2>

                        {productos.length === 0 ? (
                            <p className={styles.emptyMessage}>
                                No hay productos registrados. ¡Agrega el primero!
                            </p>
                        ) : (
                            <div className={styles.productList}>
                                {productos.map(producto => (
                                    <div key={producto.id} className={styles.productCard}>
                                        <div className={styles.productHeader}>
                                            <div className={styles.productInfo}>
                                                <h3 className={styles.productName}>{producto.nombre}</h3>
                                                <p className={styles.productDescription}>{producto.descripcion}</p>

                                                <div className={styles.productDetails}>
                                                    <div className={styles.productDetail}>
                                                        <span className={styles.detailLabel}>Precio</span>
                                                        <span className={`${styles.detailValue} ${styles.price}`}>
                                                            ${producto.precio.toFixed(2)}
                                                        </span>
                                                    </div>
                                                    <div className={styles.productDetail}>
                                                        <span className={styles.detailLabel}>Stock</span>
                                                        <span className={`${styles.detailValue} ${getStockClass(producto.stock)}`}>
                                                            {producto.stock} unidades
                                                        </span>
                                                    </div>
                                                    <div className={styles.productDetail}>
                                                        <span className={styles.detailLabel}>Categoría</span>
                                                        <span className={styles.detailValue}>{producto.categoria}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={styles.productActions}>
                                                <button
                                                    onClick={() => handleEdit(producto)}
                                                    className={`${styles.actionButton} ${styles.editButton}`}
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(producto.id!)}
                                                    className={`${styles.actionButton} ${styles.deleteButton}`}
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export { ProductAdmin };
