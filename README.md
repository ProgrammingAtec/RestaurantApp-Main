Fisrt attempt to start business

# Webshop demo
## Project Goals
- [X] backend starting knowledge (No best practices. Full backend improvisation)
- [X] nodeJs and expressJs
- [X] backup functionality
- [X] Architecture. Use one universe module for representing two different routes with different content (much less code, easy to change both sides simultenously, a bit hard to read)
- [X] Rainforce mobile layout
- [X] Write own custom HammerJS (Frontend Gesture third-party library) implementation
- [X] Dig deeper into JS internals

## Device order (by priority): mobile only.

## Code style
- See Martin Fowler Clean Code
- BEM-Yandex based

### Credits
Project belongs to me only

### Run project
- Docker (the only supported way)
    - clone git repo
    - change current directory on ```/RestaurantApp-Main```
    - run ```docker-compose -f docker-compose-restaurant.yml .```
    - check ```localhost:4200/```

### Key moments
- Available URLs
    - ```host:port/admin```
    - ```host:port/dishes```
    - ```host:port/drinks```
- May be some bugs. They will be not fixed. Project goals had been achieved

