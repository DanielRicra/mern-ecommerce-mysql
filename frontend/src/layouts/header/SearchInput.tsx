import { ActionIcon, Autocomplete, Select } from '@mantine/core';
import { IconSearch } from '@tabler/icons';
import React, { useMemo, useState } from 'react';
import useCategories from '../../hooks/useCategories';

type SearchInputProps = {
  classes: string;
};

function SearchInput({ classes }: SearchInputProps) {
  const { categories } = useCategories();
  const [categoryId, setCategoryId] = useState<string | null>('0');
  const [query, setQuery] = useState('');

  const searchButton = (
    <ActionIcon
      variant="filled"
      color="blue"
      style={{
        height: '100%',
        width: '100%',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      }}
      radius="md"
      type="submit"
    >
      <IconSearch size={26} />
    </ActionIcon>
  );

  const formatSelectData = () => {
    const data: { value: string, label: string }[] = [{ value: '0', label: 'All' }];
    categories.forEach((category) => {
      data.push({ value: category.category_id.toString(), label: category.name });
    });

    return data;
  };

  const selectData = useMemo(() => formatSelectData(), [categories]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // TODO: fetch search product by name
    event.preventDefault();
  };

  return (
    <form style={{ display: 'flex', flex: 1 }} onSubmit={handleSubmit}>
      <Select
        data={selectData}
        value={categoryId}
        variant="filled"
        size="md"
        radius="md"
        width="auto"
        style={{ maxWidth: '240px', flex: 1, fontSize: '12px' }}
        styles={{
          input: {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          },
        }}
        onChange={setCategoryId}
      />
      <Autocomplete
        size="md"
        style={{ flex: 4 }}
        className={classes}
        data={['Lettuce', 'Tomato', 'Laptop', 'Cheese', 'Meat']}
        placeholder="Search"
        radius="md"
        value={query}
        rightSection={searchButton}
        rightSectionWidth={42}
        styles={{
          input: {
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          },
        }}
        onItemSubmit={(item) => {}}
        onChange={setQuery}
      />
    </form>
  );
}

export default SearchInput;
