import toast from 'react-hot-toast';

export const paymentService = {
  /**
   * Process simulated payments for the EateryApp checkout process
   * @param {string} method - 'cash_on_delivery' | 'paystack' | 'flutterwave' | 'card'
   * @param {number} amount - Total order amount
   * @param {object} customerDetails - Name, email, phone, address
   * @returns {Promise<object>} Payment transaction results
   */
  processPayment: async (method, amount, customerDetails) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        switch (method) {
          case 'cash_on_delivery':
            resolve({
              success: true,
              reference: `COD-${Math.random().toString(36).substring(2, 11).toUpperCase()}`,
              message: 'Payment verification skipped. Order will be settled via Cash on Delivery.',
            });
            break;
            
          case 'paystack':
            toast.error('Paystack is currently in sandbox. Please select Cash on Delivery.');
            setTimeout(() => {
              reject(new Error('Paystack gateway is currently in sandbox. Please use Cash on Delivery.'));
            }, 500);
            break;
            
          case 'flutterwave':
            toast.error('Flutterwave gateway is offline. Please select Cash on Delivery.');
            setTimeout(() => {
              reject(new Error('Flutterwave payment gateway is currently offline. Please use Cash on Delivery.'));
            }, 500);
            break;
            
          case 'card':
            toast.error('Card Payment is disabled. Please select Cash on Delivery.');
            reject(new Error('Card Payment processor is disabled.'));
            break;
            
          default:
            reject(new Error('Invalid payment method selection.'));
        }
      }, 800);
    });
  }
};
