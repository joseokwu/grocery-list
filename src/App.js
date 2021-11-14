import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    list = JSON.parse(list);
    return list;
  } else {
    return [];
  }
};

function App() {
  const [list, setList] = useState(getLocalStorage());
  const [name, setName] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [alert, setAlert] = useState({ msg: '', color: '', show: false });
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert('invalid input', 'danger', true);
    } else if (name && isEdit) {
      //edit
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName('');
      setEditId(null);
      setIsEdit(false);
      showAlert('value changed', 'success', true);
    } else {
      const newList = { id: new Date().getTime().toString(), title: name };
      setList([...list, newList]);
      setName('');
      showAlert('item added', 'success', true);
    }
  };

  const showAlert = (msg = '', color = '', show = false) => {
    setAlert({ msg, color, show });
  };

  const removeItem = (id) => {
    const removeItemList = list.filter((item) => item.id !== id);
    setList(removeItemList);
    showAlert('item removed', 'danger', true);
  };

  const editItem = (id) => {
    const editedItem = list.find((item) => item.id === id);
    setIsEdit(true);
    setEditId(id);
    setName(editedItem.title);
  };

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);
  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert && (
          <Alert {...alert} alertItems={list} removeAlert={showAlert} />
        )}
        <h3>Grocery Bud</h3>
        <div className='form-control'>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type='submit' className='submit-btn'>
            {isEdit ? 'Edit' : 'Add'}
          </button>
        </div>
      </form>
      <div className='grocery-container'>
        {list.length > 0 && (
          <List items={list} removeItem={removeItem} editItem={editItem} />
        )}
        <button
          className='clear-btn'
          onClick={() => {
            setList([]);
            showAlert('List Cleared', 'danger', true);
          }}
        >
          Clear Items
        </button>
      </div>
    </section>
  );
}

export default App;
