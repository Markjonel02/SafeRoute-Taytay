import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  IconButton,
  Avatar,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { MdMailOutline, MdNotificationsNone } from "react-icons/md";

import { FaChevronDown } from "react-icons/fa";

const Header = () => {
  return (
    <Box
      w="100%"
      px={6}
      py={3}
      bg="white"
      borderBottom="1px solid"
      borderColor="gray.200"
    >
      <Flex align="center">
        {/* Search */}
        <InputGroup maxW="420px">
          <InputLeftElement pointerEvents="none">
            <FaSearch color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Search product, transactions"
            bg="gray.50"
            _placeholder={{ color: "gray.400" }}
            pr="80px"
          />
          <Text
            position="absolute"
            right="12px"
            top="50%"
            transform="translateY(-50%)"
            fontSize="xs"
            color="gray.400"
          >
            CTRL + F
          </Text>
        </InputGroup>

        <Spacer />

        {/* Right Actions */}
        <HStack spacing={4}>
          <IconButton
            variant="ghost"
            icon={<MdMailOutline size={20} />}
            aria-label="Messages"
          />
          <IconButton
            variant="ghost"
            icon={<MdNotificationsNone size={22} />}
            aria-label="Notifications"
          />

          {/* User */}
          <HStack spacing={2}>
            <Avatar size="sm" name="Shatasu Shigara" />
            <Box>
              <Text fontSize="sm" fontWeight="medium">
                Welcome back,
              </Text>
              <Text fontSize="sm" fontWeight="semibold">
                Shatasu Shigara
              </Text>
            </Box>
            <FaChevronDown />
          </HStack>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
