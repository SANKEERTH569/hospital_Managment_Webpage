import React, { useState } from 'react';
import { Pill, RefreshCw, Clock, ShoppingBag, Truck } from 'lucide-react';
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

const initialOrders: Order[] = [];

export function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState(initialPrescriptions);
  const [orders, setOrders] = useState(initialOrders);

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

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Current Prescriptions</h3>
        <Button
          variant="secondary"
          icon={RefreshCw}
          className="hover:bg-gray-100 transition-colors"
        >
          Request Refill
        </Button>
      </div>

      {/* Prescription Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {prescriptions.map((prescription) => (
          <div
            key={prescription.id}
            className="border border-gray-200 rounded-lg bg-gray-50 p-5 hover:shadow-lg hover:bg-white transition-all"
          >
            {/* Medication Header */}
            <div className="flex items-center mb-3">
              <Pill className="w-6 h-6 text-blue-500 mr-2" />
              <h4 className="text-lg font-semibold text-gray-700">
                {prescription.medication}
              </h4>
            </div>

            {/* Prescription Details */}
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <span className="font-medium">Dosage:</span> {prescription.dosage}
              </p>
              <p>
                <span className="font-medium">Frequency:</span> {prescription.frequency}
              </p>
              <p>
                <span className="font-medium">Prescribed by:</span>{' '}
                {prescription.prescribedBy}
              </p>
              <div className="flex items-center text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                <span>
                  {new Date(prescription.startDate).toLocaleDateString()} -{' '}
                  {new Date(prescription.endDate).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Status & Refills */}
            <div className="mt-4 flex justify-between items-center">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                ${
                  prescription.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : prescription.status === 'expired'
                    ? 'bg-red-100 text-red-800'
                    : prescription.status === 'pending-refill'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-blue-100 text-blue-800'
                }`}
              >
                {prescription.status === 'active'
                  ? 'Active'
                  : prescription.status === 'expired'
                  ? 'Expired'
                  : prescription.status === 'pending-refill'
                  ? 'Pending Refill'
                  : 'Ordered'}
              </span>
              <div className="text-sm font-medium text-gray-700">
                Refills: <span className="text-blue-600">{prescription.refillsLeft}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex justify-between items-center">
              <Button
                variant="primary"
                icon={RefreshCw}
                onClick={() => handleRefill(prescription.id)}
                disabled={prescription.refillsLeft === 0}
                className={`${
                  prescription.refillsLeft === 0
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-blue-500'
                } transition-colors`}
              >
                Refill
              </Button>
              <Button
                variant="secondary"
                icon={ShoppingBag}
                onClick={() => handleOrder(prescription.id)}
              >
                Order
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Orders Section */}
      {orders.length > 0 && (
        <div className="mt-10">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Order Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border border-gray-200 rounded-lg bg-gray-50 p-5 hover:shadow-lg hover:bg-white transition-all"
              >
                {/* Order Header */}
                <div className="flex items-center mb-3">
                  <Truck className="w-6 h-6 text-blue-500 mr-2" />
                  <h4 className="text-lg font-semibold text-gray-700">
                    {order.medication}
                  </h4>
                </div>

                {/* Order Details */}
                <div className="space-y-2 text-sm text-gray-600">
                  <p>
                    <span className="font-medium">Delivery Partner:</span>{' '}
                    {order.deliveryPartner}
                  </p>
                  <p>
                    <span className="font-medium">Status:</span> {order.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
