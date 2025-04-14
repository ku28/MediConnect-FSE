import { AutoComplete } from 'antd';
import { useState } from 'react';

const InputAutoCompleteForm = ({ id, medicineList, setMedicineList, defaultValue = undefined }) => {
    const [options, setOptions] = useState([]);

    const onChange = (e) => {
        const existingItem = medicineList.find((item) => item.id === id);
        const updateItem = existingItem ? { ...existingItem, medicine: e } : { id, medicine: e };
        setMedicineList(prev => {
            const indexToUpdate = prev.findIndex(item => item.id === id);
            if (indexToUpdate !== -1) {
                const updatedArray = [...prev];
                updatedArray[indexToUpdate] = updateItem;
                return updatedArray;
            } else {
                return [...prev, updateItem];
            }
        });
    };

    const onSearch = (text) => {
        const medicines = ['Paracetamol', 'Ibuprofen', 'Aspirin', 'Amoxicillin'];
        const filtered = medicines
            .filter((med) => med.toLowerCase().includes(text.toLowerCase()))
            .map((med) => ({ value: med }));
        setOptions(filtered);
    };

    return (
        <AutoComplete
            options={options}
            style={{ width: '100%' }}
            onChange={onChange}
            onSearch={onSearch}
            size='large'
            placeholder="Medicine..."
            defaultValue={defaultValue}
        />
    );
};

export default InputAutoCompleteForm;