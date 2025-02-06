import { Navbar } from '@/components';
import { useColorModeValue } from '@/components/ui/color-mode';
import { CreatePage, HomePage } from '@/pages';
import { Box } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import { Bounce, ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
        transition={Bounce}
      />
      <Box minH='100vh' bg={useColorModeValue('gray.100', 'gray.900')}>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/create' element={<CreatePage />}></Route>
        </Routes>
      </Box>
    </>
  );
};
export default App;
