# Project Media Assets

This directory contains media files for your featured projects.

## Required Files for Each Project

For each project you want to showcase, you'll need:

1. **Cover Image** (`project-name-cover.jpg` or `.png`)
   - Recommended size: 1920x1080px (16:9 aspect ratio)
   - Format: JPG or PNG
   - Shows when user is NOT hovering

2. **Demo Video** (`project-name-demo.mp4`)
   - Recommended: Short clip (5-15 seconds)
   - Format: MP4 (most compatible)
   - Should be optimized for web (compressed)
   - Plays on hover

## How to Add Your Projects

1. Place your cover images and videos in this directory (`public/projects/`)

2. Update `/src/components/Projects.tsx` and add your project to the `featuredProjects` array:

```typescript
{
  id: 'your-project-id',
  name: 'Project Name',
  description: 'Brief description of your project',
  liveUrl: 'https://your-live-site.com',
  githubUrl: 'https://github.com/your-username/repo',
  coverImage: '/projects/your-project-cover.jpg',
  video: '/projects/your-project-demo.mp4',
  tags: ['React', 'Node.js', 'AWS'], // Add relevant tags
}
```

## Tips for Creating Demo Videos

1. **Screen Recording**: Use tools like:
   - OBS Studio (free, cross-platform)
   - QuickTime (Mac)
   - Windows Game Bar (Windows)

2. **Video Optimization**: Compress your videos to reduce file size:
   - Use HandBrake or FFmpeg
   - Target: 2-5MB for 10-second clips
   - Resolution: 720p or 1080p

3. **FFmpeg Command** for compression:
   ```bash
   ffmpeg -i input.mp4 -vcodec h264 -acodec aac -strict -2 -crf 28 output.mp4
   ```

## Example Structure

```
public/
└── projects/
    ├── portfolio-cover.jpg
    ├── portfolio-demo.mp4
    ├── ecommerce-cover.jpg
    ├── ecommerce-demo.mp4
    ├── chatapp-cover.jpg
    └── chatapp-demo.mp4
```
