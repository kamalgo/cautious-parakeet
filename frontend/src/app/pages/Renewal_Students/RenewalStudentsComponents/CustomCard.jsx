// import React, { useEffect, useState } from 'react';
// import { Box, Text, Button, VStack, useToast, SimpleGrid } from '@chakra-ui/react';
// import { getRemarks, removeRemarkApi } from '../../../api/RenewalStudentsApi/RenewalStudentsApi';

// const CustomCard = ({ title, id, onRemoveRemark }) => {
//   const [remarks, setRemarks] = useState([]);
//   const toast = useToast(); // Initialize useToast

//   useEffect(() => {
//     const fetchRemarks = async () => {
//       try {
//         const fetchedRemarks = await getRemarks(id);
//         if (Array.isArray(fetchedRemarks)) {
//           setRemarks(fetchedRemarks); // Correctly set remarks if an array is returned
//         } else {
//           console.log("No remarks data found.");
//         }
//       } catch (error) {
//         console.error("Error fetching remarks:", error);
//       }
//     };

//     if (id) {
//       fetchRemarks(); // Only fetch remarks when 'id' is present
//     }
//   }, [id]);

//   const handleRemoveRemark = async (index) => {
//     try {
//       // Call the removeRemarkApi function
//       const response = await removeRemarkApi(id, index);
      
//       if (response.success) {
//         // Update local state with the updated remarks array
//         setRemarks(response.remarks);
//         if (onRemoveRemark) onRemoveRemark(index); // Execute additional functionality if provided
  
//         // Show success toast
//         toast({
//           title: 'Success',
//           description: 'Remark removed successfully.',
//           status: 'success',
//           duration: 5000,
//           isClosable: true,
//         });
//       } else {
//         // Show error toast
//         console.error("Failed to remove remark:", response.message);
//         toast({
//           title: 'Error',
//           description: response.message || 'An error occurred while removing the remark.',
//           status: 'error',
//           duration: 5000,
//           isClosable: true,
//         });
//       }
//     } catch (error) {
//       console.error("Error removing remark:", error);
//       // Show general error toast
//       toast({
//         title: 'Error',
//         description: 'An unexpected error occurred.',
//         status: 'error',
//         duration: 5000,
//         isClosable: true,
//       });
//     }
//   };
  
  

//   return (
//     <Box borderWidth="3px" borderRadius="lg" p={4} mb={4}>
//       <Text fontSize="lg" fontWeight="bold" mb={2}>{title}</Text>
//       <SimpleGrid columns={3} spacing={4}>
//         {remarks.length > 0 ? (
//           remarks.map((remark, index) => (
//             <Box key={index} p={4} borderWidth="1px" borderRadius="md">
//               <Text>{remark}</Text>
//               <Button mt={2} colorScheme="red" onClick={() => handleRemoveRemark(index)}>
//                 Remove
//               </Button>
//             </Box>
//           ))
//         ) : (
//           <Text>No remarks available</Text>
//         )}
//       </SimpleGrid>
//     </Box>
//   );
// };

// export default CustomCard;



import React, { useEffect, useState } from 'react';
import { Box, Text, Button, SimpleGrid, useToast } from '@chakra-ui/react';
import { getRemarks, removeRemarkApi } from '../../../api/RenewalStudentsApi/RenewalStudentsApi';

const CustomCard = ({ title, id }) => {
  const [remarks, setRemarks] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const fetchRemarks = async () => {
      try {
        const fetchedRemarks = await getRemarks(id);
        if (Array.isArray(fetchedRemarks)) {
          setRemarks(fetchedRemarks);
        } else {
          console.log("No remarks data found.");
        }
      } catch (error) {
        console.error("Error fetching remarks:", error);
      }
    };

    if (id) {
      fetchRemarks();
    }
  }, [id]); // Fetch remarks whenever 'id' changes

  const handleRemoveRemark = async (index) => {
    try {
      const response = await removeRemarkApi(id, index);
      if (response.success) {
        setRemarks(response.remarks);
        toast({
          title: 'Success',
          description: 'Remark removed successfully.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } else {
        console.error("Failed to remove remark:", response.message);
        toast({
          title: 'Error',
          description: response.message || 'An error occurred while removing the remark.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error removing remark:", error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box borderWidth="3px" borderRadius="lg" p={4} mb={4}>
      <Text fontSize="lg" fontWeight="bold" mb={2}>{title}</Text>
      <SimpleGrid columns={3} spacing={4}>
        {remarks.length > 0 ? (
          remarks.map((remark, index) => (
            <Box key={index} p={4} borderWidth="1px" borderRadius="md">
              <Text>{remark}</Text>
              <Button mt={2} colorScheme="red" onClick={() => handleRemoveRemark(index)}>
                Remove
              </Button>
            </Box>
          ))
        ) : (
          <Text>No remarks available</Text>
        )}
      </SimpleGrid>
    </Box>
  );
};

export default CustomCard;
