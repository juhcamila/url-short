import { Inject, Injectable } from '@nestjs/common';
import { UrlRepository } from './url.repository';
import { randomHashUrl } from 'src/config/utils';

@Injectable()
export class UrlService {
  constructor(
    @Inject(UrlRepository)
    private readonly urlRepository: UrlRepository
  ) { }
  async create(url: string): Promise<string> {
    const generateHash = await this.hashValid()
    await this.urlRepository.create(url, generateHash)
    return `${process.env.HOSTNAME_PATH}${generateHash}`
  }

  async find(hash: string): Promise<{ url: string }> {
    const url = await this.urlRepository.find(hash)
    return { url: url?.link }
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
