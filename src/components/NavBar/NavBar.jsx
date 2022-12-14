import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Image,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import Rune from '../Imagenes/Rune.png';
import Cartwidget from '../Cartwidget/Cartwidget';
import * as Router from 'react-router-dom';
export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box position={'fixed'} width={'100%'} zIndex={'100'}>
      <Flex
        bg={useColorModeValue('rgb(50,50,50)', 'gray.800')}
        color={useColorModeValue('#ffcf00', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('#ffcf00', 'gray.900')}
        align={'center'}>
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'white')}>
            <Image src={Rune} boxSize='4.5em'></Image>
          </Text>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
          <Button
            bgColor={'rgba(0,0,0,0.5)'}
            fontSize={'sm'}
            fontWeight={400}
    
           >
          <Router.Link to={'/Singin'}>Sign In</Router.Link>
          </Button>
          <Button
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'#ffcf00'}
            _hover={{ bg: '#cc9900' }}
            _active={{ bg: '#b28405' }}
          >
            <Router.Link to={'/Singup'}>Sign Up</Router.Link>
          </Button>
          <Router.Link to={'/cart'}><Cartwidget/></Router.Link>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('#ffcf00', 'gray.200');
  const linkHoverColor = useColorModeValue('#cc9900', 'white');
  const popoverContentBgColor = useColorModeValue('#a0a0a0', 'gray.800');

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label} >
          <Popover trigger={'hover'} placement={'bottom-start'} >
            
            <PopoverTrigger >
              <Text
                p={2}
                
                fontSize={'6sm'}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}>
                {<Router.Link to={`${navItem.href}`}>{navItem.label}</Router.Link>}
              </Text>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}
                textAlign={'left'}
                >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Flex
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('gray.100', 'gray.900') }}>
      <Router.Link to={href}>
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: '#cc9900' }}
            fontWeight={500}>
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}>
          <Icon color={'#cc9900'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
      </Router.Link>
    </Flex>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}
      >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}>
        <Text
          fontWeight={600}
          color={useColorModeValue('#3b3f49', 'gray.200')}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gold', 'gray.700')}
          align={'start'}>
          {children &&
            children.map((child) => (
              <Text key={child.label} py={2}>
                <Router.Link to={child.href} >{child.label}</Router.Link>
              </Text>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};
const NAV_ITEMS = [
  {
    label: 'Home',
    href: '/'
  },
  {
    label: 'Categories',
    href: '/',
    children: [
      {
        label: 'Axes',
        subLabel: 'harass their defense',
        href: '/item/category/Axe',
      },
      {
        label: 'Bows',
        subLabel: '',
        href: '/item/category/Bow',
      },
      {
        label: 'Balista',
        subLabel: '',
        href: '/item/category/Ballista',
      },
      {
        label:'Claw',
        subLabel:'Let them fear you',
        href:'/item/category/Claw'
      },
      {
        label:'Crossbow',
        subLabel:'',
        href:'/item/category/Crossbow'
      },
      { label:'Dagger',
        subLabel:'Speed and letal',
        href:'/item/category/Dagger'},

        {label:'Colossal Sword',
        subLabel:'1v1',
        href:'/item/category/ColossalSword'},

        {label:'Colossal Weapon',
        subLabel:'A powerfull punch',
        href:'/item/category/ColossalWeapon'},

        {label:'Curved Sword',
        subLabel:'Clean Cut',
        href:'/item/category/CurvedSword'},

        {label:'Curved Greatsword',
        subLabel:'Streng and skills in one hit',
        href:'/item/category/CurvedGreatsword'},

        {label:'Fist',
        subLabel:'if you wanna be one punchman',
        href:'/item/category/Fist'}
    ],

  },
];