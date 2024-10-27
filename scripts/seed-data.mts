import { createClient, type ClientConfig } from '@sanity/client';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, '.env.local') });

// Load environment variables
dotenv.config({ path: resolve(__dirname, '../.env.local') });

interface Project {
  _type: string;
  title: string;
  description: string;
  technologies: string[];
  link: string;
  featured: boolean;
}

const sanityConfig: ClientConfig = {
  projectId: 'km433600',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'sk3gvyOI4uN8F5tUnFPnXf8pST9kkiJ16EyySQYWcSafl1DWaG5DITxEx34vZI46UmUTKyjd9rcAxCurqh37AMAShu1EhtUkHpJJvlg8IXGwbPvOlQZQ8u1zK9r3tBkdtAmvplLjre2iSqVkhlusQQveH1rkjarkoYAVI7CkajxxJdLKYsG9',
  useCdn: true,
};

const client = createClient(sanityConfig);

const sampleProjects: Project[] = [
  {
    _type: 'project',
    title: 'Secure File Transfer System',
    description: 'Engineered a secure file transfer system with Merkle Trees for enhanced security and data integrity.',
    technologies: ['Python', 'Flask', 'Merkle Trees'],
    link: 'https://github.com/eshwanthkartitr/file-transfer-including-Merkle-tree',
    featured: true
  },
  {
    _type: 'project',
    title: 'Cycle Management System',
    description: 'Developed a campus bike-sharing system with secure, barcode-based ID authentication.',
    technologies: ['Java', 'Flask', 'JavaFx'],
    link: 'https://github.com/eshwanthkartitr/Cycle-management-system.git',
    featured: true
  },
  {
    _type: 'project',
    title: 'GAN-based Image Swapper',
    description: 'Created a GAN model for realistic face-swapping in videos, focusing on expressions and lighting accuracy.',
    technologies: ['Python', 'PyTorch', 'GANs'],
    link: 'https://github.com/eshwanthkartitr/deepfake-generation-and-detection.git',
    featured: true
  },
  {
    _type: 'project',
    title: 'TSP Visualizer',
    description: 'Built an interactive visualizer for the Traveling Salesman Problem, demonstrating optimization techniques.',
    technologies: ['JavaScript', 'React.js', 'Leaflet', 'Ant Colony Optimization'],
    link: 'https://travelling-salesman-visualize.web.app',
    featured: true
  },
  {
    _type: 'project',
    title: 'Manipulator Display',
    description: 'Developed a 3D display for visualizing manipulations in space using Three.js.',
    technologies: ['JavaScript', 'Three.js'],
    link: 'https://github.com/eshwanthkartitr/letmecook.github.io.git',
    featured: true
  }
];

const seedData = async (): Promise<void> => {
  try {
    console.log('Starting to seed data...');
    
    // Delete existing projects
    console.log('Deleting existing projects...');
    await client.delete({ query: '*[_type == "project"]' });
    
    // Create new projects
    for (const project of sampleProjects) {
      console.log(`Creating project: ${project.title}`);
      await client.create(project);
      console.log(`Created project: ${project.title}`);
    }
    
    console.log('Data seeded successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData().catch((error: Error) => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
