import Flex from "@/styles/Flex.styled";
import Text from "@/styles/Text.styled";
import Theme from "@/styles/Theme.styled";

const Navbar = () => {
  return (
    <Flex
      as={"nav"}
      backgroundColor={Theme.colors.white}
      borderRadius="4px 4px 0 0"
      padding="24px"
      border={`1px solid ${Theme.colors.lightGrey}`}
      justifyContent="space-between"
      alignItems="center"
    >
      <Text>Search</Text>
      <Text as={"h1"} fontSize="24px" fontStyle="normal" fontWeight="800" lineHeight="150%" letterSpacing="4px">
        BYTEPING
      </Text>
      <Text fontSize="20px" fontStyle="normal" fontWeight="600" lineHeight="150%">
        Account
      </Text>
    </Flex>
  );
};

export default Navbar;
