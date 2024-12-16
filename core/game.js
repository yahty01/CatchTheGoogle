import {GameStatuses} from "./game-statuses";
import {Player} from "./player";
import {Position} from "./position";
import {Google} from "./google";

export class Game {
  #status = GameStatuses.SETTINGS
  #google
  #player1
  #player2
  #numberUtility;// = new ShogunNumberUtility();
  #settings = {
    gridSize: {
      columns: 4,
      rows: 4
    },
    googleJumpInterval: 1000
  }


  // DI/DependencyInjection
  constructor(somethingSimilarToNumberUtility) {
    this.#numberUtility = somethingSimilarToNumberUtility; // must have getRandomIntegerNumber method
  }


  #getRandomPosition(coordinates) {
    let newColumns, newRows
    do {
      newColumns = this.#numberUtility.getRandomIntegerNumber(1, this.#settings.gridSize.columns);
      newRows = this.#numberUtility.getRandomIntegerNumber(1, this.#settings.gridSize.rows);
    } while (coordinates.some((el) => el.columns === newColumns && el.rows === newRows))

    return new Position(newColumns, newRows);
  }

  #createUnits() {
    const player1Position = this.#getRandomPosition([]);
    this.#player1 = new Player(player1Position, "1");


    const player2Position = this.#getRandomPosition([player1Position]);
    this.#player2 = new Player(player2Position, "2");


    const googlePosition = this.#getRandomPosition([
      player1Position,
      player2Position,
    ]);

    this.#google = new Google(googlePosition);
  }


  set googleJumpInterval(newValue) {
    if (typeof newValue !== 'number') {
      throw new TypeError('Arguments must be numbers');
    }
    if (newValue <= 0) {
      throw new TypeError('Interval must be numbers');
    }
    this.#settings.googleJumpInterval = newValue
  }

  async start() {
    if (this.#status !== GameStatuses.SETTINGS) {
      throw new Error('Game must be in Settings before Start')
    }
    this.#createUnits();
    this.#status = GameStatuses.IN_PROGRESS

    // this.#makeGoogleJump();

    // setInterval(() => {
    //     this.#makeGoogleJump();
    // }, this.#settings.googleJumpInterval)
  }

  // #makeGoogleJump() {
  //     const newPosition = {
  //         x: this.#numberUtility.getRandomIntegerNumber(0, this.#settings.gridSize.columns),
  //         y: this.#numberUtility.getRandomIntegerNumber(0, this.#settings.gridSize.rows),
  //     }
  //     if (newPosition.x === this.googlePosition?.x && newPosition.y === this.googlePosition?.y) {
  //         this.#makeGoogleJump()
  //         return;
  //     }
  //
  //     this.#googlePosition = newPosition
  // }

  get status() {
    return this.#status
  }

  set settingsGridSize(position) {
    this.#settings.gridSize = position
  }

  get settings() {
    return this.#settings;
  }

  // get googlePosition() {
  //     return this.#googlePosition
  // }

  get gridSize() {
    return this.#settings.gridSize
  }

  get player1() {
    return this.#player1;
  }

  get player2() {
    return this.#player2;
  }

  get google() {
    return this.#google;
  }
}

// antipattern GOD-object

// query, getter, selector
// action/command/setter/mutation
