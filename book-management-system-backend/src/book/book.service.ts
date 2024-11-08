import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { DbService } from 'src/db/db.service';
import { Book } from './entities/book.entity';

function randomNum() {
  return Math.floor(Math.random() * 1000000);
}

@Injectable()
export class BookService {
  @Inject(DbService)
  dbService: DbService;

  async create(createBookDto: CreateBookDto) {
    const books: Book[] = await this.dbService.read();

    const book = new Book();
    book.id = randomNum();
    book.name = createBookDto.name;
    book.author = createBookDto.author;
    book.description = createBookDto.description;
    book.cover = createBookDto.cover;

    books.push(book);

    await this.dbService.write(books);
    return book;
  }

  async findAll(name: string) {
    const books: Book[] = await this.dbService.read();
    return name ? books.filter((book) => book.name.includes(name)) : books;
  }

  async findOne(id: number) {
    const books: Book[] = await this.dbService.read();
    return books.find((book) => book.id === id);
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const books: Book[] = await this.dbService.read();

    const foundBook = books.find((book) => book.id === id);

    if (!foundBook) {
      throw new BadRequestException('该图书不存在');
    }

    foundBook.name = updateBookDto.name;
    foundBook.author = updateBookDto.author;
    foundBook.description = updateBookDto.description;
    foundBook.cover = updateBookDto.cover;

    await this.dbService.write(books);

    return foundBook;
  }

  async remove(id: number) {
    const books: Book[] = await this.dbService.read();
    const index = books.findIndex((book) => book.id === id);

    if (index !== -1) {
      books.splice(index, 1);
      await this.dbService.write(books);
    }
  }
}