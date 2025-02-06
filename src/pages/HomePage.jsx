import { ProductCard } from '@/components';
import { useProductStore } from '@/store/product';
import { Container, SimpleGrid, Spinner, Text, VStack } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';

const HomePage = () => {
  const toastShown = useRef(false);
  const { products, loading, getProducts } = useProductStore();

  useEffect(() => {
    getProducts().then((res) => {
      if (res?.success === false && !toastShown.current) {
        toast.error(res?.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce
        });
      }
      toastShown.current = true;
    });

    return () => {
      toastShown.current = false;
    };
  }, [getProducts]);

  return (
    <Container maxW={'container.xl'} py={12}>
      <VStack spaceY={8} spaceX={8}>
        <Text
          fontSize={30}
          fontWeight={'bold'}
          bgGradient={'to-r'}
          gradientFrom={'cyan.400'}
          gradientTo={'blue.500'}
          bgClip={'text'}
          textAlign={'center'}
        >
          Current Products 🚀
        </Text>

        {loading ? (
          <Spinner borderWidth={'4px'} size='xl' />
        ) : (
          <SimpleGrid
            columns={{
              base: 1,
              md: 2,
              lg: 3
            }}
            gap={5}
            w={'full'}
          >
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </SimpleGrid>
        )}
        {products?.length === 0 && (
          <Text
            fontSize={'xl'}
            textAlign={'center'}
            fontWeight={'bold'}
            color={'gray.500'}
          >
            No products found 😢
            <Link to={'/create'}>
              <Text
                as={'span'}
                color={'blue.500'}
                _hover={{ textDecoration: 'underline' }}
              >
                Create a product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
