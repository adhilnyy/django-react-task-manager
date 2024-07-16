import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getItem, addItem, deleteItem, editItem } from './components/ApiUrl';

const TaskManager = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ title: "", description: "" });
  const [showModal, setShowModal] = useState(false);
  const [editItemData, setEditItemData] = useState(null);

  useEffect(() => {
    const loadTask = async () => {
      const fetchData = await getItem();
      setItems(fetchData);
    };
    loadTask();
  }, []);

  // add item
  const handleAddItem = async () => {
    try {
      const addedItem = await addItem(newItem);
      setItems([...items, addedItem]);
      setNewItem({ title: "", description: "" });
    } catch (error) {
      console.error(error);
    }
  };

  // edit pop up
  const handleClose = () => {
    setShowModal(false);
    setEditItemData(null); // Reset editItemData when closing modal
  };

  // edit item
  const handleEditItem = async (id) => {
    if (editItemData) {
      const updatedItem = await editItem(id, editItemData);
      setItems(items.map(item => item.id === id ? updatedItem : item));
      handleClose();
    }
  };

  // delete item
  const handleDeleteItem = async (id) => {
    await deleteItem(id);
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <>
      <h1>Task Manager</h1>
      <hr className='my-1' />
      <h6>Add Task</h6>
      <div className="form-floating mb-3">
        <input type="text" className="form-control" id="floatingInput" placeholder="Enter Title"
          value={newItem.title} onChange={(e) => setNewItem({ ...newItem, title: e.target.value })} />
        <label htmlFor="floatingInput">Title</label>
      </div>
      <div className="form-floating mb-3">
        <input type="text" className="form-control" id="floatingDescription" placeholder="Description"
          value={newItem.description} onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} />
        <label htmlFor="floatingDescription">Description</label>
      </div>
      <Button type='button' className='btn btn-warning mb-3' onClick={handleAddItem}>Add</Button>
      <hr className='my-1' />
      <h6>Tasks</h6>
      <ul>
        {items.map(item => (
          <li key={item.id} className='py-1'>
            <div className="input-group">
              <span className='me-2'><b>{item.title}</b></span>
              <span className='me-2'>{item.description}</span>
              <Button className="btn btn-secondary"
                onClick={() => {
                  setShowModal(true);
                  setEditItemData(item);
                }} type="button">Edit</Button>
              <Button className="btn btn-danger" onClick={() => handleDeleteItem(item.id)} type="button">Delete</Button>
            </div>
          </li>
        ))}
      </ul>

      {editItemData && (
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={editItemData.title}
                  onChange={(e) => setEditItemData({ ...editItemData, title: e.target.value })}
                  placeholder="Enter Title"
                />
              </Form.Group>
              <Form.Group controlId="formDescription" className="mt-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  value={editItemData.description}
                  onChange={(e) => setEditItemData({ ...editItemData, description: e.target.value })}
                  placeholder="Description"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={()=>handleEditItem(editItemData.id)}>
              Save changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default TaskManager;
