import random
player_pokemon = "Charizard"
enemy_pokemon = "Blastoise"
player_hp = 100
enemy_hp = 100
RANDOM_PCT = random.randint(0, 10)
additional_damage = 0

while enemy_hp > 0 and player_hp > 0:

    player_hp = player_hp - 15

    print("Player HP:", player_hp)

    if player_hp <= 0:

        print(player_pokemon, "fainted!")

        print(enemy_pokemon, "wins!")

        print("Try again")

        break

    print(player_pokemon, "used Flamethrower!")

   

    enemy_hp = enemy_hp - 20 + (RANDOM_PCT * 2)



    print("Enemy HP:", enemy_hp)

    if enemy_hp <= 0:

        print(enemy_pokemon, "fainted!")

        print("You win!")

        break