// App.js
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from "../firebase";
import { 
  collection, addDoc, doc, updateDoc, deleteDoc 
} from "firebase/firestore";



import { 
  FaSave, 
  FaTrash, 
  FaEdit, 
  FaPlus, 
  FaTimes,
  FaCalendarAlt,
  FaTag,
  FaDollarSign,
  FaImage
} from 'react-icons/fa';
import { IoIosCheckmarkCircle } from 'react-icons/io';

const CreateProgram = () => {
  // Initialize services from localStorage or empty array
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    image: '/api/placeholder/400/400',
    category: '',
    startDate: '',
    features: []
  });
  const [currentFeature, setCurrentFeature] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  // Load services from localStorage on component mount
  useEffect(() => {
    const savedServices = localStorage.getItem('services');
    if (savedServices) {
      setServices(JSON.parse(savedServices));
    }
  }, []);

  // Save to localStorage whenever services change
  useEffect(() => {
    localStorage.setItem('services', JSON.stringify(services));
  }, [services]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addFeature = () => {
    if (currentFeature.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, currentFeature.trim()]
      }));
      setCurrentFeature('');
    }
  };

  const removeFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleFeatureKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addFeature();
    }
  };

  const generateId = () => {
    return Date.now().toString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const serviceData = {
      ...formData,
      id: editingId || generateId(),
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null
    };
  
    try {
      if (editingId) {
        // Update Firestore
        const docRef = doc(db, "services", editingId);
        await updateDoc(docRef, serviceData);
  
        // Update local state
        setServices(prev => prev.map(s => s.id === editingId ? serviceData : s));
      } else {
        // Add to Firestore
        const docRef = await addDoc(collection(db, "services"), serviceData);
  
        // Insert generated Firebase ID
        serviceData.id = docRef.id;
  
        setServices(prev => [...prev, serviceData]);
      }
  
      // Reset form
      setFormData({
        id: '',
        name: '',
        description: '',
        price: '',
        originalPrice: '',
        image: '/api/placeholder/400/400',
        category: '',
        startDate: '',
        features: []
      });
      setEditingId(null);
  
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
  
    } catch (err) {
      console.error("Error saving service: ", err);
    }
  };
  
  

  const editService = (service) => {
    setFormData({
      ...service,
      price: service.price.toString(),
      originalPrice: service.originalPrice ? service.originalPrice.toString() : ''
    });
    setEditingId(service.id);
  };

  // const deleteService = async (id) => {
  //   setServices(prev => prev.filter(service => service.id !== id));
  
  //   // 🔥 Delete from Firestore
  //   try {
  //     await deleteDoc(doc(db, "services", id));
  //     console.log("Service deleted from Firebase!");
  //   } catch (error) {
  //     console.error("Error deleting document: ", error);
  //   }
  // };

  const deleteService = async (id) => {
    try {
      await deleteDoc(doc(db, "services", id));
      setServices(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      console.error("Error deleting service:", err);
    }
  };
  
  

  const cancelEdit = () => {
    setFormData({
      id: '',
      name: '',
      description: '',
      price: '',
      originalPrice: '',
      image: '/api/placeholder/400/400',
      category: '',
      startDate: '',
      features: []
    });
    setEditingId(null);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Service Management
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Add and manage your services with an intuitive interface
          </p>
        </motion.header>

        <div className="grid grid-cols-1  gap-8">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-6"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              {editingId ? (
                <>
                  <FaEdit className="text-blue-500" />
                  Edit Service
                </>
              ) : (
                <>
                  <FaPlus className="text-green-500" />
                  Add New Service
                </>
              )}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Service Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter service name"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Describe the service"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <FaDollarSign className="text-green-500" />
                    Price *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="0.00"
                  />
                </div>

                {/* Original Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Original Price
                  </label>
                  <input
                    type="number"
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <FaTag className="text-purple-500" />
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select a category</option>
                    <option value="prevention">Prevention</option>
                    <option value="recovery">Recovery</option>
                    <option value="education">Education</option>
                    <option value="support">Support</option>
                  </select>
                </div>

                {/* Start Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <FaCalendarAlt className="text-orange-500" />
                    Start Date *
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FaImage className="text-pink-500" />
                  Image URL
                </label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="/api/placeholder/400/400"
                />
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Features
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={currentFeature}
                    onChange={(e) => setCurrentFeature(e.target.value)}
                    onKeyPress={handleFeatureKeyPress}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter a feature"
                  />
                  <button
                    type="button"
                    onClick={addFeature}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                  >
                    <FaPlus />
                  </button>
                </div>

                {/* Features List */}
                <AnimatePresence>
                  {formData.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg mb-2"
                    >
                      <span>{feature}</span>
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="text-red-500 hover:text-red-700 transition-colors duration-200"
                      >
                        <FaTimes />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Form Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2 font-semibold"
                >
                  <FaSave />
                  {editingId ? 'Update Service' : 'Save Service'}
                </button>
                
                {editingId && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </motion.div>

          {/*  */}
        </div>
      </div>

      {/* Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3"
          >
            <IoIosCheckmarkCircle className="text-xl" />
            <span className="font-semibold">
              {editingId ? 'Service updated successfully!' : 'Service saved successfully!'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CreateProgram;