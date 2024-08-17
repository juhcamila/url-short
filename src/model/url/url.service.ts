import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UrlRepository } from './url.repository';
import { randomHashUrl } from '../../config/utils';
import { UrlEntity } from './entities/url.entity';
import { UrlsDto } from './dto/urls.dto';

@Injectable()
export class UrlService {
  constructor(
    @Inject(UrlRepository)
    private readonly urlRepository: UrlRepository
  ) { }
  async create(url: string, userId?: number): Promise<string> {
    const generateHash = await this.hashValid()
    await this.urlRepository.create(url, generateHash, userId)
    return `${process.env.HOSTNAME_PATH}${generateHash}`
  }

  async find(hash: string): Promise<UrlEntity> {
    return await this.urlRepository.find(hash)
  }

  async findByUser(id: number, userId: number): Promise<UrlEntity> {
    return await this.urlRepository.findByUser(id, userId)
  }

  async update(id: number, userId: number, link: string): Promise<UrlEntity> {
    const url = await this.findByUser(id, userId)
    if (!url) {
      throw new NotFoundException()
    }

    return await this.urlRepository.update(url, link)
  }

  async findAllByUser(userId: number): Promise<UrlsDto[]> {
    const urls = await this.urlRepository.findAllByUser(userId)
    return urls.map((url) => {
      return {
        id: url.id,
        link: url.link,
        linkShort:`${process.env.HOSTNAME_PATH}${url.hash}`,
        contAccess: url.access?.count || 0,
        createdAt: url.createdAt,
        updatedAt: url.updatedAt,
      }
    })
  }

  async redirect(hash: string): Promise<{ url: string }>{
    const url = await this.find(hash)
    return { url: url?.link }
  }

  async delete(id: number, userId: number): Promise<void> {
    const url = await this.findByUser(id, userId)
    if (!url) {
      throw new NotFoundException()
    }

    return await this.urlRepository.delete(url)
  }
  
  private async hashValid(): Promise<string> {
    const generateHash = randomHashUrl()
    const findHash = await this.urlRepository.find(generateHash)
    if (findHash) {
      return await this.hashValid()
    }
    return generateHash
  }
}
