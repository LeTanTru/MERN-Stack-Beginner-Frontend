import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Box, Button, Heading, HStack, Image, Text } from '@chakra-ui/react';
import { useColorModeValue } from '@/components/ui/color-mode';
import { useProductStore } from '@/store/product';
import { Bounce, toast } from 'react-toastify';
import { UpdateProductDialog } from '@/components';

const ProductCard = ({ product }) => {
  const { loading, deleteProduct } = useProductStore();

  const textColor = useColorModeValue('gray.900', 'gray.100');
  const bg = useColorModeValue('white', 'gray.800');

  const handleDeleteProduct = async (id) => {
    const data = await deleteProduct(id);
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
    <Box
      shadow={'lg'}
      rounded={'lg'}
      overflow={'hidden'}
      transition={'all 0.3s linear'}
      _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w={'full'}
        objectFit={'cover'}
      />
      <Box p={4}>
        <Heading as={'h3'} size={'md'} mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight={'bold'} fontSize={'xl'} color={textColor} mb={4}>
          ${product.price}
        </Text>
        <HStack gap={2}>
          <UpdateProductDialog product={product} />
          <Button
            loading={loading}
            p={2}
            bgColor={'#dc9ba1'}
            onClick={() => handleDeleteProduct(product._id)}
          >
            <MdDelete cursor={'pointer'} style={{ width: 20, height: 20 }} />
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};
export default ProductCard;
