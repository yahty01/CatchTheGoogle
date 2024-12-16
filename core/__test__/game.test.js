import {Game} from "../game";
import {GameStatuses} from "../game-statuses";
import {ShogunNumberUtility} from "../utils/shogun-number-utility";

describe('game', () => {
  // it('should start game', async () => {
  //     const numberUtil = new ShogunNumberUtility()
  //     const game = new Game(numberUtil);
  //     await game.start();
  //     expect(game.status).toBe(GameStatuses.IN_PROGRESS);
  // });

  // it('should start game', async () => {
  //     const numberUtil = new ShogunNumberUtility()
  //     const game = new Game(numberUtil);
  //     await game.start();
  //     expect(game.status).toBe(GameStatuses.IN_PROGRESS);
  // });

  // it('game should be created and return status', async () => {
  //     const numberUtil = new ShogunNumberUtility()
  //     const game = new Game(numberUtil)
  //     expect(game.status).toBe(GameStatuses.SETTINGS);
  //     await game.start();
  //     expect(game.status).toBe(GameStatuses.IN_PROGRESS);
  // })

  // it('google should be in the Grid after start', async () => {
  //     const numberUtil = new ShogunNumberUtility()
  //
  //     for (let i = 0; i < 100; i++) {
  //         const game = new Game(numberUtil)
  //         expect(game.googlePosition).toBeNull();
  //         await game.start()
  //         expect(game.googlePosition.x).toBeLessThan(game.gridSize.columnsCount)
  //         expect(game.googlePosition.x).toBeGreaterThanOrEqual(0)
  //         expect(game.googlePosition.y).toBeLessThan(game.gridSize.rowsCount)
  //         expect(game.googlePosition.y).toBeGreaterThanOrEqual(0)
  //     }
  // })

  // it('google should be in the Grid but in new position after jump', async () => {
  //     const numberUtil = new ShogunNumberUtility()
  //     const game = new Game(numberUtil)
  //     game.googleJumpInterval = 1; // ms
  //     await game.start() // jump -> webAPI/browser 10
  //
  //     for (let i = 0; i < 100; i++) {
  //         const prevGooglePosition = game.googlePosition;
  //         await delay(1) // await -> webAPI/browser 10 // after 10 ms: macrotasks: [jump, await]
  //         const currentGooglePosition = game.googlePosition;
  //         expect(prevGooglePosition).not.toEqual(currentGooglePosition)
  //     }
  // })

  it('player1, player2 should have unique coordinates', async () => {
    const numberUtil = new ShogunNumberUtility()
    for (let i = 0; i < 10; i++) {
      const game = new Game(numberUtil)
      game.settingsGridSize = {
        columns: 2,
        rows: 3,
      }

      console.log(game.settings);
      await game.start()

      expect([1, 2]).toContain(game.player1.position.columns)
      expect([1, 2, 3]).toContain(game.player1.position.rows)

      expect([1, 2]).toContain(game.player2.position.columns)
      expect([1, 2, 3]).toContain(game.player2.position.rows)

      expect(
        game.player1.position.columns !== game.player2.position.columns ||
        game.player1.position.rows !== game.player2.position.rows
      )


      expect([1, 2]).toContain(game.google.position.columns)
      expect([1, 2, 3]).toContain(game.google.position.rows)

      expect(
        (game.player1.position.columns !== game.player2.position.columns ||
          game.player1.position.rows !== game.player2.position.rows) &&
        (game.player1.position.columns !== game.google.position.columns ||
          game.player1.position.rows !== game.google.position.y) &&
        (game.player2.position.columns !== game.google.position.columns ||
          game.player2.position.rows !== game.google.position.y)
      ).toBe(true)
    }
  })


})

// промисифиуаяи setTimeout
const delay = (ms) => new Promise((res, rej) => setTimeout(res, ms))
