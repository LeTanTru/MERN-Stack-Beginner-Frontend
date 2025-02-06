'use client';
import { Button, Input } from '@chakra-ui/react';
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogRoot
} from '@/components/ui/dialog';
import { Field } from '@/components/ui/field';
import { useRef, useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { useProductStore } from '@/store/product';
import { Bounce, toast } from 'react-toastify';

const UpdateProductDialog = ({ product }) => {
  const ref = useRef(null);
  const btnCancelRef = useRef(null);
  const { updateProduct } = useProductStore();
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const data = await updateProduct(updatedProduct);
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
      btnCancelRef?.current?.click();
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
    <DialogRoot initialFocusEl={() => ref.current} motionPreset='slide-in-top'>
      <DialogTrigger asChild>
        <Button p={2} bgColor='#7cb3d5'>
          <FaRegEdit cursor='pointer' style={{ width: 20, height: 20 }} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Product</DialogTitle>
        </DialogHeader>
        <DialogBody pb='4'>
          <Field label='Product Name'>
            <Input
              ref={ref}
              placeholder='Enter product name'
              value={updatedProduct?.name}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, name: e.target.value })
              }
            />
          </Field>
          <Field label='Price'>
            <Input
              placeholder='Enter price'
              value={updatedProduct?.price}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, price: e.target.value })
              }
            />
          </Field>
          <Field label='Image'>
            <Input
              placeholder='Enter image URL'
              value={updatedProduct?.image}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, image: e.target.value })
              }
            />
          </Field>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant='outline' ref={btnCancelRef}>
              Cancel
            </Button>
          </DialogActionTrigger>
          <Button colorScheme='blue' onClick={handleUpdateProduct}>
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default UpdateProductDialog;
