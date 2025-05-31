import {
  Box,
  Flex,
  Grid,
  GridItem, Show
} from '@chakra-ui/react';
import GameGrid from './components/GameGrid';
import GameHeading from './components/GameHeading';
import GenreList from './components/GenreList';
import NavBar from './components/NavBar';
import PlatformSelector from './components/PlatformSelector';
import SortSelector from './components/SortSelector';

function App() {
  return (
    <Grid
      dir="rtl"  // Enable RTL direction for the whole grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,  // aside first, then main on large screens
      }}
      templateColumns={{
        base: '1fr',
        lg: '250px 1fr',  // first column is aside (sidebar) 250px, second main 1fr
      }}
    >
      <GridItem area="nav">
        <NavBar />
      </GridItem>
      <Show above="lg">
        <GridItem area="aside" paddingX={5}>
          <GenreList />
        </GridItem>
      </Show>
      <GridItem area="main">
        <Box paddingRight={2}>  {/* padding on right for RTL */}
          <GameHeading />
          <Flex marginBottom={5}>
            <Box marginLeft={5}> {/* margin-left instead of margin-right */}
              <PlatformSelector />
            </Box>
            <SortSelector />
          </Flex>
        </Box>
        <GameGrid />
      </GridItem>
    </Grid>
  );
}

export default App;
