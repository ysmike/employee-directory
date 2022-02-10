/* eslint-disable react/no-children-prop */
import { SearchIcon, SmallCloseIcon } from '@chakra-ui/icons';
import {
  Input, InputGroup, InputLeftElement, InputRightElement, Box,
} from '@chakra-ui/react';
import { useSearch } from '../../../lib/searchState';

export default function Search() {
  const { search, setSearch, clearSearch } = useSearch();
  console.log({ search });
  const onChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <InputGroup w={{ base: '10rem', md: '30rem' }} flex="flex-end">
      <InputLeftElement
        pointerEvents="none"
        children={<SearchIcon color="gray.300" />}
      />
      <Input placeholder="Search" value={search} onChange={onChange} />
      <Box _onHover={{ cursor: 'pointer' }}>
        <InputRightElement
          onClick={clearSearch}
          children={<SmallCloseIcon color="green.500" />}
        />
      </Box>
    </InputGroup>

  );
}
