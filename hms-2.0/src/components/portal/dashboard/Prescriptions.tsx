import React, { useState } from 'react';
import { Pill, RefreshCw, Clock, ShoppingBag, Truck, Calendar, AlertCircle, CheckCircle, Search, Filter, ChevronDown } from 'lucide-react';
import { FaCalendarCheck, FaFilePrescription, FaHistory } from 'react-icons/fa';
import { Button } from '../../ui/Button';

interface Prescription {
  id: string;
  medication: string;
  dosage: string;
  frequency: string;
  prescribedBy: string;
  startDate: string;
  endDate: string;
  refillsLeft: number;
  status: 'active' | 'expired' | 'pending-refill' | 'ordered';
}

interface Order {
  id: string;
  medication: string;
  deliveryPartner: string;
  status: 'dispatched' | 'in-transit' | 'delivered';
}

const initialPrescriptions: Prescription[] = [
  {
    id: '1',
    medication: 'Amoxicillin',
    dosage: '500mg',
    frequency: 'Twice daily',
    prescribedBy: 'Dr. Sarah Johnson',
    startDate: '2024-03-01',
    endDate: '2024-03-14',
    refillsLeft: 2,
    status: 'active',
  },
  {
    id: '2',
    medication: 'Lisinopril',
    dosage: '10mg',
    frequency: 'Once daily',
    prescribedBy: 'Dr. Michael Chen',
    startDate: '2024-02-15',
    endDate: '2024-05-15',
    refillsLeft: 1,
    status: 'pending-refill',
  },
  // Add more prescription data here
  {
    id: '3',
    medication: 'Metformin',
    dosage: '500mg',
    frequency: 'Twice daily',
    prescribedBy: 'Dr. Emily Clark',
    startDate: '2024-01-10',
    endDate: '2024-04-10',
    refillsLeft: 3,
    status: 'active',
  },
  {
    id: '4',
    medication: 'Amlodipine',
    dosage: '5mg',
    frequency: 'Once daily',
    prescribedBy: 'Dr. John Doe',
    startDate: '2024-02-01',
    endDate: '2024-08-01',
    refillsLeft: 0,
    status: 'expired',
  },
];

const initialOrders: Order[] = [
  {
    id: '1',
    medication: 'Amoxicillin',
    deliveryPartner: 'MedExpress',
    status: 'dispatched'
  },
  {
    id: '3',
    medication: 'Metformin',
    deliveryPartner: 'PharmaDirect',
    status: 'in-transit'
  }
];

export function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState(initialPrescriptions);
  const [orders, setOrders] = useState(initialOrders);
  const [activeTab, setActiveTab] = useState<'prescriptions' | 'orders'>('prescriptions');
  const [searchTerm, setSearchTerm] = useState('');

  const handleRefill = (id: string) => {
    setPrescriptions((prevPrescriptions) =>
      prevPrescriptions.map((prescription) =>
        prescription.id === id && prescription.refillsLeft > 0
          ? { ...prescription, refillsLeft: prescription.refillsLeft - 1 }
          : prescription
      )
    );
  };

  const handleOrder = (id: string) => {
    const prescription = prescriptions.find((p) => p.id === id);
    if (prescription) {
      setPrescriptions((prevPrescriptions) =>
        prevPrescriptions.map((p) =>
          p.id === id ? { ...p, status: 'ordered' } : p
        )
      );
      setOrders((prevOrders) => [
        ...prevOrders,
        {
          id,
          medication: prescription.medication,
          deliveryPartner: 'XYZ Delivery',
          status: 'dispatched',
        },
      ]);
    }
  };

  const filteredPrescriptions = prescriptions.filter(prescription => 
    prescription.medication.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prescription.prescribedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredOrders = orders.filter(order => 
    order.medication.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header Section */}
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center">
            <FaFilePrescription className="mr-2 text-blue-600" />
            <span>Medication Management</span>
          </h3>
          <Button
            variant="primary"
            icon={RefreshCw}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white transition-all"
          >
            Request New Prescription
          </Button>
        </div>
        
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search medications or doctors..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative w-full md:w-48">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select 
              className="pl-10 pr-8 py-2 w-full border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="expired">Expired</option>
              <option value="pending-refill">Pending Refill</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ChevronDown className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`py-2 px-4 font-medium text-sm flex items-center ${activeTab === 'prescriptions' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('prescriptions')}
          >
            <Pill className="w-4 h-4 mr-2" />
            Prescriptions
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm flex items-center ${activeTab === 'orders' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('orders')}
          >
            <Truck className="w-4 h-4 mr-2" />
            Orders
          </button>
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'prescriptions' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrescriptions.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-10 text-gray-500">
              <AlertCircle className="w-12 h-12 mb-4 text-gray-400" />
              <p className="text-lg font-medium">No prescriptions found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          ) : (
            filteredPrescriptions.map((prescription) => (
              <div
                key={prescription.id}
                className="relative overflow-hidden border border-gray-200 rounded-xl bg-white p-5 hover:shadow-lg transition-all group"
              >
                {/* Status indicator */}
                <div className="absolute top-0 right-0 w-20 h-20">
                  <div 
                    className={`absolute transform rotate-45 translate-y-[-50%] w-[170%] h-6 flex items-center justify-center text-xs font-bold text-white
                    ${
                      prescription.status === 'active'
                        ? 'bg-green-500'
                        : prescription.status === 'expired'
                        ? 'bg-red-500'
                        : prescription.status === 'pending-refill'
                        ? 'bg-yellow-500'
                        : 'bg-blue-500'
                    }`}
                  >
                    {prescription.status === 'active'
                      ? 'Active'
                      : prescription.status === 'expired'
                      ? 'Expired'
                      : prescription.status === 'pending-refill'
                      ? 'Pending Refill'
                      : 'Ordered'}
                  </div>
                </div>

                {/* Decorative accent */}
                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-500 to-indigo-600"></div>

                {/* Medication Header */}
                <div className="flex items-center mb-4 pl-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 mr-3">
                    <Pill className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                      {prescription.medication}
                    </h4>
                    <p className="text-sm text-gray-500">{prescription.dosage}</p>
                  </div>
                </div>

                {/* Prescription Details */}
                <div className="space-y-3 pl-3 mb-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 mt-0.5 text-gray-400 mr-2">
                      <RefreshCw className="w-full h-full" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Frequency</p>
                      <p className="text-sm text-gray-600">{prescription.frequency}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 mt-0.5 text-gray-400 mr-2">
                      <FaCalendarCheck className="w-full h-full" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Duration</p>
                      <p className="text-sm text-gray-600">
                        {new Date(prescription.startDate).toLocaleDateString()} - {new Date(prescription.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 mt-0.5 text-gray-400 mr-2">
                      <Calendar className="w-full h-full" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Prescribed by</p>
                      <p className="text-sm text-gray-600">{prescription.prescribedBy}</p>
                    </div>
                  </div>
                </div>

                {/* Refills */}
                <div className="pl-3 mb-5">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-gray-700 mr-2">Refills Remaining:</div>
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 font-bold text-sm">
                      {prescription.refillsLeft}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center pl-3 pt-4 border-t border-gray-100">
                  <Button
                    variant="primary"
                    icon={RefreshCw}
                    onClick={() => handleRefill(prescription.id)}
                    disabled={prescription.refillsLeft === 0}
                    className={`${
                      prescription.refillsLeft === 0
                        ? 'opacity-50 cursor-not-allowed bg-gray-300'
                        : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white'
                    } transition-all`}
                  >
                    Refill
                  </Button>
                  <Button
                    variant="secondary"
                    icon={ShoppingBag}
                    onClick={() => handleOrder(prescription.id)}
                    className="border border-gray-300 hover:bg-gray-100 transition-all"
                  >
                    Order
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Orders Tab Content */}
      {activeTab === 'orders' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-10 text-gray-500">
              <AlertCircle className="w-12 h-12 mb-4 text-gray-400" />
              <p className="text-lg font-medium">No orders found</p>
              <p className="text-sm">Try adjusting your search or place a new order</p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className="relative overflow-hidden border border-gray-200 rounded-xl bg-white p-5 hover:shadow-lg transition-all group"
              >
                {/* Status indicator */}
                <div 
                  className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium flex items-center
                  ${
                    order.status === 'dispatched'
                      ? 'bg-blue-100 text-blue-800'
                      : order.status === 'in-transit'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {order.status === 'dispatched' ? (
                    <>
                      <ShoppingBag className="w-3 h-3 mr-1" />
                      Dispatched
                    </>
                  ) : order.status === 'in-transit' ? (
                    <>
                      <Truck className="w-3 h-3 mr-1" />
                      In Transit
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Delivered
                    </>
                  )}
                </div>

                {/* Decorative accent */}
                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-indigo-500 to-purple-600"></div>

                {/* Order Header */}
                <div className="flex items-center mb-4 pl-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 mr-3">
                    <FaHistory className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                      {order.medication}
                    </h4>
                    <p className="text-sm text-gray-500">Order #{order.id}</p>
                  </div>
                </div>

                {/* Order Details */}
                <div className="space-y-3 pl-3 mb-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 mt-0.5 text-gray-400 mr-2">
                      <Truck className="w-full h-full" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Delivery Partner</p>
                      <p className="text-sm text-gray-600">{order.deliveryPartner}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 mt-0.5 text-gray-400 mr-2">
                      <Clock className="w-full h-full" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Estimated Delivery</p>
                      <p className="text-sm text-gray-600">
                        {order.status === 'dispatched' 
                          ? '3-5 business days' 
                          : order.status === 'in-transit' 
                          ? '1-2 business days' 
                          : 'Delivered'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex justify-end items-center pl-3 pt-4 border-t border-gray-100">
                  <Button
                    variant="secondary"
                    className="border border-gray-300 hover:bg-gray-100 transition-all"
                  >
                    Track Order
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Medication Reminders Section */}
      <div className="mt-10 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <div className="flex items-center mb-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 mr-3">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">Medication Reminders</h3>
        </div>
        <p className="text-gray-600 mb-4">Set up reminders to never miss a dose of your medication.</p>
        <Button
          variant="primary"
          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white transition-all"
        >
          Set Up Reminders
        </Button>
      </div>
    </div>
  );
}
