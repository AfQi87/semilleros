import { RouteInfo } from './sidebar.metadata';

//Sidebar menu Routes and data
export const ROUTES: RouteInfo[] = [

  {
    path: '',
    title: 'Usuarios',
    icon: 'fa-solid fa-circle-user',
    class: 'sub',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    submenu: [
      {
        path: '/dashboard/users',
        title: 'Usuarios',
        icon: 'bx bxright-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: []
      },
      {
        path: '/dashboard/users',
        title: 'Tipos',
        icon: 'bx bxright-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: []
      },
      {
        path: '/dashboard/users',
        title: 'Estados',
        icon: 'bx bxright-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: []
      },
    ]
  },

  {
    path: '',
    title: 'Investigación',
    icon: 'fa-solid fa-magnifying-glass',
    class: 'sub',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    submenu: [
      {
        path: '/dashboard/semilleros',
        title: 'Semilleros',
        icon: 'bx bxright-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: []
      },
      {
        path: '/dashboard/employs',
        title: 'Lineas de investigación',
        icon: 'bx bxright-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: []
      },
    ]
  },
  {
    path: '',
    title: 'Proyectos',
    icon: 'fa-solid fa-layer-group',
    class: 'sub',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    submenu: [
      {
        path: '/dashboard/project',
        title: 'Proyectos',
        icon: 'bx bxright-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: []
      },
      {
        path: '/dashboard/employs',
        title: 'Tipos',
        icon: 'bx bxright-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: []
      },
      {
        path: '/dashboard/employs',
        title: 'Estados',
        icon: 'bx bxright-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: []
      },
    ]
  },
  {
    path: '',
    title: 'Eventos',
    icon: 'fa-regular fa-calendar-days',
    class: 'sub',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    submenu: [
      {
        path: '/dashboard/employs',
        title: 'Eventos',
        icon: 'bx bxright-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: []
      },
      {
        path: '/dashboard/employs',
        title: 'Tipos',
        icon: 'bx bxright-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: []
      },
      {
        path: '/dashboard/employs',
        title: 'Modalidades',
        icon: 'bx bxright-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: []
      },
      {
        path: '/dashboard/employs',
        title: 'Clasificaciones',
        icon: 'bx bxright-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: []
      },
    ]
  },
];