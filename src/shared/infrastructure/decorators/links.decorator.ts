import { SetMetadata } from '@nestjs/common';
import { Link } from '../service/api/api.response';

export const HttpLinks = (links: Record<string, Link>) => SetMetadata('api_links', links);
