import ResearchersList from '../components/researcher/ResearcherList';
import ResearcherForm from '../components/researcher/ResearcherForm';
import ResearchersModal from '../components/researcher/ResearcherModal';
import { Button } from '@chakra-ui/react';
import { useState } from 'react';

const ResearchersPage = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

    
  return (
    <div>
      <h1 className='text-center text-indigo-400 font-semibold text-2xl'>Marketplace</h1>
      <Button onClick={openModal}>Add Researcher</Button>
      <ResearchersModal isOpen={isModalOpen} onClose={closeModal} />
      <ResearchersList />
      <h1>ResearchPapers</h1>
      
    </div>
  );
};

export default ResearchersPage;
