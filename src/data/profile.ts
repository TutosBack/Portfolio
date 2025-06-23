import { CarouselItem } from '../components/types';
import { Work, Testimonial } from '../components/types';

export const profile = {
  name: "Edmund Tutuma",
  role: "Software Engineer",
  location: "New York, USA",
  description: `Software engineer & Educator living in New York, USA.\nSkilled with problem solving, systems development using web, desktop and AI technologies.`,
  image: "https://avatars.githubusercontent.com/u/124844140?s=400&u=c07cd17bab6c28a398cb89f5fc681b4ee85e02b9&v=4",
  email: "edmund.tutuma@email.com",
};

export const works: Work[] = [
  { title: "Consultfranc Therapy Services", subtitle: "Website, Therapy", icon: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=100&h=100&fit=crop&q=80" },
  { title: "Patience Peace, Mbarara", subtitle: "Website, PhysioTherapy", icon: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=100&h=100&fit=crop&q=80" },
  { title: "Smart Skills", subtitle: "Website, Non Profit", icon: "https://images.unsplash.com/photo-1579389083395-4507e98b5b67?w=100&h=100&fit=crop&q=80" },
];

export const carouselItems: CarouselItem[] = [
  {
    id: 'react',
    title: 'React',
    description: 'A JavaScript library for building user interfaces with component-based architecture and virtual DOM for optimal performance.',
    image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Frontend',
    level: 'Expert',
    yearsOfExperience: 4
  },
  {
    id: 'typescript',
    title: 'TypeScript',
    description: 'A strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.',
    image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Language',
    level: 'Expert',
    yearsOfExperience: 3
  },
  {
    id: 'nodejs',
    title: 'Node.js',
    description: 'A JavaScript runtime built on Chrome\'s V8 engine for building scalable network applications and server-side development.',
    image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Backend',
    level: 'Advanced',
    yearsOfExperience: 3
  },
  {
    id: 'python',
    title: 'Python',
    description: 'A versatile programming language perfect for web development, data science, AI, and automation with clean syntax.',
    image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Language',
    level: 'Expert',
    yearsOfExperience: 5
  },
  {
    id: 'aws',
    title: 'AWS',
    description: 'Amazon Web Services cloud platform providing scalable computing, storage, and networking infrastructure solutions.',
    image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Cloud',
    level: 'Intermediate',
    yearsOfExperience: 2
  },
  {
    id: 'docker',
    title: 'Docker',
    description: 'Containerization platform that enables developers to package applications with their dependencies for consistent deployment.',
    image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'DevOps',
    level: 'Advanced',
    yearsOfExperience: 2
  },
  {
    id: 'mongodb',
    title: 'MongoDB',
    description: 'A NoSQL document database that provides high performance, high availability, and easy scalability for modern applications.',
    image: 'https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Database',
    level: 'Advanced',
    yearsOfExperience: 3
  },
  {
    id: 'git',
    title: 'Git',
    description: 'Distributed version control system for tracking changes in source code during software development projects.',
    image: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Tools',
    level: 'Expert',
    yearsOfExperience: 5
  }
];

export const testimonials: Testimonial[] = [
  {
    name: "Jane Doe",
    feedback: "Edmund is a fantastic engineer! His work on our project was top-notch.",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    name: "John Smith",
    feedback: "Professional, reliable, and highly skilled. Highly recommended!",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg"
  }
];