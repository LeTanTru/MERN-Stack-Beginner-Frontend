import { useColorModeValue } from '@/components/ui/color-mode';
import { useProductStore } from '@/store/product';
import { floatingStyles } from '@/utils/styles';
import {
  Box,
  Button,
  Container,
  Field,
  Heading,
  Input,
  VStack
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';

const CreatePage = () => {
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: ''
  });

  const { loading, createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const data = await createProduct(newProduct);
    if (data?.success) {
      toast.success(data?.message, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce
      });
      navigate('/');
    } else {
      toast.error(data?.message, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce
      });
    }
  };

  return (
    <Container maxW={'xl'}>
      <VStack spaceY={8}>
        <Heading as={'h1'} size={'2xl'} textAlign={'center'} mb={8}>
          Create New Product
        </Heading>
        <Box
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          p={6}
          rounded={'lg'}
          shadow={'md'}
        >
          <VStack spaceY={4}>
            <Field.Root>
              <Box pos='relative' w='full'>
                <Input
                  placeholder=''
                  className='peer'
                  name='name'
                  border={'1px solid #26a389'}
                  transition={'border 0.3s ease-in-out'}
                  focusRingColor={'#26a389'}
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                />
                <Field.Label css={floatingStyles}>Product name</Field.Label>
              </Box>
            </Field.Root>
            <Field.Root>
              <Box pos='relative' w='full'>
                <Input
                  placeholder=''
                  className='peer'
                  name='price'
                  border={'1px solid #26a389'}
                  transition={'border 0.3s ease-in-out'}
                  focusRingColor={'#26a389'}
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                />
                <Field.Label css={floatingStyles}>Price</Field.Label>
              </Box>
            </Field.Root>
            <Field.Root>
              <Box pos='relative' w='full'>
                <Input
                  className='peer'
                  placeholder=''
                  name='image'
                  border={'1px solid #26a389'}
                  transition={'border 0.3s ease-in-out'}
                  focusRingColor={'#26a389'}
                  value={newProduct.image}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, image: e.target.value })
                  }
                />
                <Field.Label css={floatingStyles}>Image</Field.Label>
              </Box>
            </Field.Root>

            <Button
              loading={loading}
              colorPalette={'cyan'}
              onClick={handleAddProduct}
              w={'full'}
            >
              Create
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};
export default CreatePage;
