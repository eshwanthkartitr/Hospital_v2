import { client } from '@/lib/sanity';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const projects = await client.fetch(`
      *[_type == "project"] {
        _id,
        title,
        description,
        technologies,
        link,
        featured,
        "imageUrl": image.asset->url
      }
    `);
    
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}
