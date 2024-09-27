import { useState, useEffect } from 'react';
import * as petService from './services/petService';
import PetList from './components/PetList';
import PetDetail from './components/PetDetail';
import PetForm from './components/PetForm';

// src/App.jsx

const App = () => {
  const [petList, setPetList] = useState([]);
  const [selected, setSelected] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Create a new useEffect
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const pets = await petService.index();
        // Don't forget the pass the error object to the new Error
        if (pets.error) {
          throw new Error(pets.error);
        }
        setPetList(pets);
      } catch (error) {
        // Log the error object
        console.log(error);
      }
    };

    fetchPets();

    // add an empty dependency array to the `useEffect` hook.
  }, []);

  const updateSelected = (pet) => {
    setSelected(pet)
  }

  const handleFormView = () => {
    setIsFormOpen(!isFormOpen);
  };

  const handleAddPet = async (formData) => {
    try {
      const newPet = await petService.create(formData);
      setPetList([newPet, ...petList]);
      setIsFormOpen(false);
    } catch (error) {}
    console.log(error);
  };


  return (
    <>
      <PetList
        petList={petList}
        updateSelected={updateSelected}
        handleFormView={handleFormView}
        isFormOpen={isFormOpen}
      />
      {isFormOpen ? (
        <PetForm handleAddPet={handleAddPet} />
      ) : (
        <PetDetail selected={selected} />
      )}
    </>
  );
}

export default App;