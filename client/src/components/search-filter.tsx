import { Paper, InputBase, IconButton } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

interface SearchFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function SearchFilter({ search, onSearchChange }: SearchFilterProps) {
  return (
    <Paper
      elevation={1}
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        mb: 4,
        borderRadius: 2,
      }}
    >
      <IconButton sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search movies by title, director or genre..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </Paper>
  );
}