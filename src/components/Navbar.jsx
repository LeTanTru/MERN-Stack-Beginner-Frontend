import { FiPlusSquare } from 'react-icons/fi';
import { Button, Container, Flex, HStack, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { IoMoonSharp } from 'react-icons/io5';
import { IoSunnySharp } from 'react-icons/io5';
import { useColorMode } from '@/components/ui/color-mode';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container mx={'auto'} maxW={'1140px'} p={4}>
      <Flex
        alignItems={'center'}
        justifyContent={'space-between'}
        flexDir={{ base: 'column', sm: 'row' }}
      >
        <Text
          fontSize={{ base: '22', sm: '28' }}
          fontWeight={'bold'}
          textTransform={'uppercase'}
          textAlign={'center'}
          bgGradient={'to-r'}
          gradientFrom={'cyan.400'}
          gradientTo={'blue.500'}
          bgClip={'text'}
        >
          <Link to={'/'}>Product Store 🛒</Link>
        </Text>
        <HStack>
          <Link to={'/create'}>
            <Button
              bgColor={colorMode === 'dark' ? '#282b34' : '#f4f4f4'}
              color={colorMode === 'dark' ? 'white' : '#282b34'}
              mr={2}
              p={3}
              _hover={{
                opacity: '0.8'
              }}
            >
              <FiPlusSquare
                stroke={colorMode === 'dark' ? 'white' : '#282b34'}
                style={{
                  width: '30px',
                  height: '30px'
                }}
              />
            </Button>
          </Link>
          <Button
            bgColor={colorMode === 'dark' ? '#282b34' : '#f4f4f4'}
            color={colorMode === 'dark' ? 'white' : '#282b34'}
            fontSize={20}
            onClick={toggleColorMode}
            transition={'all linear 0.3s'}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.3s ease-in-out',
                transform:
                  colorMode === 'light' ? 'rotate(0deg)' : 'rotate(180deg)'
              }}
            >
              {colorMode === 'light' ? <IoMoonSharp /> : <IoSunnySharp />}
            </span>
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
