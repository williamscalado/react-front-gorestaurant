import { Component, useEffect, useState } from 'react';

import Header from '../../components/Header';
import api from '../../services/api';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';

interface IFoodData {
  name: string,
  image: string,
  price: string,
  description: string
} 
interface IFoodFullData extends IFoodData {
  id: string,
  available: boolean
}

interface IState {
  foods: IFoodFullData[],
  editingFood: IFoodFullData,
  modalOpen?: boolean,
  editModalOpen: boolean,
  

}
const Dashboard = () => {  

   const [state, setState] = useState<IState>(
    {
      foods: [],
      editingFood: {} as IFoodFullData,
      modalOpen: false,
      editModalOpen: false,
    }
  )
  
  useEffect(()=>{
    if(state.foods){
      componentDidMount()
    }


  }, [])
  
  const componentDidMount = async () => {
    const response = await api.get('/foods');

    setState({ ...state , foods: response.data  });
  }
  
  const handleAddFood = async (food: IFoodData) => {
    const { foods } = state;

    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      setState({ ...state , foods: [...foods, response.data], modalOpen: false });
      
    } catch (err) {
      console.log(err);
    }
  }

  const handleUpdateFood = async (food: IFoodData) => {
    const { foods, editingFood } = state;

    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated : IFoodFullData[] = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      setState({ ...state ,foods: foodsUpdated, editModalOpen: false});
    } catch (err) {
      console.log(err);
    }
  }

  const handleDeleteFood = async (id: string) => {
    const { foods } = state;

    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    setState({...state , foods: foodsFiltered });
  }

  const toggleModal = () => {
    const { modalOpen } = state;

    setState({ ...state , modalOpen: !modalOpen });
  }

  const toggleEditModal = () => {
    const { editModalOpen } = state;

    setState({ ...state , editModalOpen: !editModalOpen });
  }

  const handleEditFood = (food: IFoodFullData) => {
    setState({...state , editingFood: food, editModalOpen: true });
  }
    

  const { modalOpen, editModalOpen, editingFood, foods } = state;
  


  console.log(state)

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen as boolean}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
}

export default Dashboard;
