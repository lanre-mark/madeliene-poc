import {RestockInfo} from '../../components/toast/icons';

const testData = [
  {id: 5, name: "Industrial Laser", price: "2764.00", instock: "7832"},
  {id: 11, name: "Radioactive Lint", price: "1.12", instock: "54323"},
  {id: 16, name: "Snooper robotic dog", price: "8932.00", instock: "3"},
  {id: 17, name: "Zorin Microchip", price: "735.43", instock: "2143"},
  {id: 18, name: "Rake Scanner", price: "34.00", instock: "3"},
];

const notifyData = [
  {id: "16", title: "Re-Stock", description: "Please re-stock snooper robotic dog, you have 3 units left.", backgroundColor: "#5cb85c", icon: RestockInfo},
  {id: "18", title: "Re-Stock", description: "Please re-stock rake scanner, you have 3 units left.", backgroundColor: "#5cb85c", icon: RestockInfo},
];

const handleSelect = jest.fn();
const handleNotified = jest.fn(() => true);

export {handleSelect, handleNotified, notifyData, testData}