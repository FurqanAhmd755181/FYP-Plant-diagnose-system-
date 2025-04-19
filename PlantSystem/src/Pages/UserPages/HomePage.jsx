import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StyleSheet,
  TextInput,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Pressable } from "react-native";


const categories = [
  { id: "flowers", name: "Flowers", icon: "flower" },
  { id: "fruits", name: "Fruits", icon: "food-apple" },
  { id: "vegetables", name: "Vegetables", icon: "food-variant" },
  { id: "herbs", name: "Herbs", icon: "leaf" },
  { id: "succulents", name: "Succulents", icon: "cactus" },
  { id: "indoor_plants", name: "Indoor Plants", icon: "home-outline" },
  { id: "cacti", name: "Cacti", icon: "tree" },
];

const plantsByCategory = {
  flowers: [
    {
      id: 1,
      name: "Rose",
      description: "Classic flower",
      imageUrl: require("../../assets/images/Rose.png"),
      toxicityToHumans: "Mildly toxic",
      toxicityToPets: "Mildly toxic",
      weedPotential: "Low",
      distribution: "Global",
      characteristics: {
        matured: {
          height: "1.2 m",
          spread: "1 m",
          leafColor: ["#228B22", "#006400"],
          leafType: "Deciduous",
          plantingTime: "Spring",
        },
        flower: {
          color: ["#FF0000", "#FFC0CB"],
          bloomingSeason: "Spring to Fall",
          fragrance: "Strong",
        },
        fruit: {
          hasFruit: false,
        },
      },
    },
  ],
  fruits: [
    {
      id: 3,
      name: "Apple Tree",
      description: "Produces apples",
      imageUrl: require("../../assets/images/AppleTree.png"),
      toxicityToHumans: "Non-toxic",
      toxicityToPets: "Non-toxic",
      weedPotential: "Low",
      distribution: "Temperate regions",
      characteristics: {
        matured: {
          height: "6 m to 25 m",
          spread: "8 m",
          leafColor: ["#00BFA5", "#F44336", "#FF9800"],
          leafType: "Deciduous",
          plantingTime: "Spring, Autumn",
        },
        flower: {
          color: ["#FFFFFF", "#F8BBD0"],
          bloomingSeason: "Spring",
          fragrance: "Mild",
        },
        fruit: {
          hasFruit: true,
        },
      },
    },
  ],
  vegetables: [
    {
      id: 5,
      name: "Tomato",
      description: "Popular fruit vegetable",
      imageUrl: require("../../assets/images/Tomato.png"),
      toxicityToHumans: "Leaves are toxic",
      toxicityToPets: "Mildly toxic",
      weedPotential: "Moderate",
      distribution: "Worldwide",
      characteristics: {
        matured: {
          height: "1.5 m",
          spread: "60 cm",
          leafColor: ["#228B22"],
          leafType: "Deciduous",
          plantingTime: "Spring",
        },
        flower: {
          color: ["#FFFF00"],
          bloomingSeason: "Late Spring",
          fragrance: "Mild",
        },
        fruit: {
          hasFruit: true,
        },
      },
    },
    {
      id: 6,
      name: "Carrot",
      description: "Root vegetable",
      imageUrl: require("../../assets/images/carrot.png"),
      toxicityToHumans: "Non-toxic",
      toxicityToPets: "Non-toxic",
      weedPotential: "Low",
      distribution: "Temperate zones",
      characteristics: {
        matured: {
          height: "30 cm",
          spread: "10 cm",
          leafColor: ["#228B22"],
          leafType: "Deciduous",
          plantingTime: "Spring, Fall",
        },
        flower: {
          color: ["#FFFFFF"],
          bloomingSeason: "Summer (biennial)",
          fragrance: "None",
        },
        fruit: {
          hasFruit: false,
        },
      },
    },
  ],
  herbs: [
    {
      id: 7,
      name: "Basil",
      description: "Aromatic herb",
      imageUrl: require("../../assets/images/basil.png"),
      toxicityToHumans: "Non-toxic",
      toxicityToPets: "Non-toxic",
      weedPotential: "Low",
      distribution: "Tropical regions",
      characteristics: {
        matured: {
          height: "50 cm",
          spread: "30 cm",
          leafColor: ["#2E8B57"],
          leafType: "Herbaceous",
          plantingTime: "Spring",
        },
        flower: {
          color: ["#FFFFFF", "#Purple"],
          bloomingSeason: "Summer",
          fragrance: "Strong",
        },
        fruit: {
          hasFruit: false,
        },
      },
    },
    {
      id: 8,
      name: "Mint",
      description: "Cooling herb",
      imageUrl: require("../../assets/images/Rose.png"),
      toxicityToHumans: "Non-toxic",
      toxicityToPets: "Mildly toxic to cats and dogs",
      weedPotential: "High",
      distribution: "Global",
      characteristics: {
        matured: {
          height: "45 cm",
          spread: "90 cm",
          leafColor: ["#3CB371"],
          leafType: "Herbaceous",
          plantingTime: "Spring",
        },
        flower: {
          color: ["#Purple", "#White"],
          bloomingSeason: "Summer",
          fragrance: "Minty",
        },
        fruit: {
          hasFruit: false,
        },
      },
    },
  ],
  succulents: [
    {
      id: 9,
      name: "Aloe Vera",
      description: "Medicinal succulent",
      imageUrl: require("../../assets/images/Rose.png"),
      toxicityToHumans: "Mildly toxic (latex)",
      toxicityToPets: "Toxic",
      weedPotential: "Low",
      distribution: "Africa, Asia",
      characteristics: {
        matured: {
          height: "60 cm",
          spread: "50 cm",
          leafColor: ["#228B22", "#A2D149"],
          leafType: "Succulent",
          plantingTime: "Spring",
        },
        flower: {
          color: ["#Yellow", "#Orange"],
          bloomingSeason: "Summer",
          fragrance: "Mild",
        },
        fruit: {
          hasFruit: false,
        },
      },
    },
    {
      id: 10,
      name: "Echeveria",
      description: "Rosette-forming succulent",
      imageUrl: require("../../assets/images/Rose.png"),
      toxicityToHumans: "Non-toxic",
      toxicityToPets: "Non-toxic",
      weedPotential: "Low",
      distribution: "Mexico, Central America",
      characteristics: {
        matured: {
          height: "15 cm",
          spread: "20 cm",
          leafColor: ["#90EE90", "#8FBC8F"],
          leafType: "Succulent",
          plantingTime: "Spring",
        },
        flower: {
          color: ["#Pink", "#Orange"],
          bloomingSeason: "Summer",
          fragrance: "None",
        },
        fruit: {
          hasFruit: false,
        },
      },
    },
  ],
  indoor_plants: [
    {
      id: 11,
      name: "Snake Plant",
      description: "Air purifying plant",
      imageUrl: require("../../assets/images/Rose.png"),
      toxicityToHumans: "Mildly toxic",
      toxicityToPets: "Toxic",
      weedPotential: "Low",
      distribution: "West Africa",
      characteristics: {
        matured: {
          height: "90 cm",
          spread: "30 cm",
          leafColor: ["#006400", "#9ACD32"],
          leafType: "Evergreen",
          plantingTime: "Year-round (indoors)",
        },
        flower: {
          color: ["#White", "#Greenish"],
          bloomingSeason: "Rare indoors",
          fragrance: "Mild",
        },
        fruit: {
          hasFruit: false,
        },
      },
    },
    {
      id: 12,
      name: "Peace Lily",
      description: "Elegant flowering houseplant",
      imageUrl: require("../../assets/images/Rose.png"),
      toxicityToHumans: "Mildly toxic",
      toxicityToPets: "Toxic",
      weedPotential: "Low",
      distribution: "Tropical Americas",
      characteristics: {
        matured: {
          height: "65 cm",
          spread: "50 cm",
          leafColor: ["#228B22"],
          leafType: "Evergreen",
          plantingTime: "Spring",
        },
        flower: {
          color: ["#FFFFFF"],
          bloomingSeason: "Spring to Summer",
          fragrance: "Mild",
        },
        fruit: {
          hasFruit: false,
        },
      },
    },
  ],
  cacti: [
    {
      id: 13,
      name: "Saguaro",
      description: "Large iconic cactus",
      imageUrl: require("../../assets/images/Rose.png"),
      toxicityToHumans: "Non-toxic",
      toxicityToPets: "Non-toxic",
      weedPotential: "Low",
      distribution: "Sonoran Desert",
      characteristics: {
        matured: {
          height: "12 m",
          spread: "3 m",
          leafColor: ["#006400"],
          leafType: "Spiny",
          plantingTime: "Spring",
        },
        flower: {
          color: ["#White"],
          bloomingSeason: "Late Spring",
          fragrance: "Mild",
        },
        fruit: {
          hasFruit: true,
        },
      },
    },
    {
      id: 14,
      name: "Prickly Pear",
      description: "Cactus with edible fruit",
      imageUrl: require("../../assets/images/Rose.png"),
      toxicityToHumans: "Non-toxic (if peeled)",
      toxicityToPets: "Mildly toxic",
      weedPotential: "High",
      distribution: "Americas, Mediterranean",
      characteristics: {
        matured: {
          height: "1.5 m",
          spread: "3 m",
          leafColor: ["#556B2F"],
          leafType: "Spiny",
          plantingTime: "Spring",
        },
        flower: {
          color: ["#Yellow", "#Red"],
          bloomingSeason: "Spring to Early Summer",
          fragrance: "Mild",
        },
        fruit: {
          hasFruit: true,
        },
      },
    },
  ],
};


const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("matured");

  const renderCategoryItem = ({ item }) => (
    <Pressable
      style={({ pressed }) => [
        styles.categoryCard,
        pressed && styles.categoryCardPressed,
      ]}
      onPress={() => setSelectedCategory(item.id)}
    >
      <Icon name={item.icon} size={40} color="#0B5D51" />
      <Text style={styles.categoryText}>{item.name}</Text>
    </Pressable>
  );

  const renderCharacteristicContent = (characteristics, tab) => {
    if (!characteristics || !characteristics[tab]) return <Text>No data available.</Text>;

    const data = characteristics[tab];

    switch (tab) {
      case "matured":
        return (
          <>
            <View style={styles.characteristicsRow}>
              <Text style={styles.characteristicsLabel}>Ultimate Height</Text>
              <Text style={styles.characteristicsValue}>{data.height}</Text>
            </View>
            <View style={styles.characteristicsRow}>
              <Text style={styles.characteristicsLabel}>Ultimate Spread</Text>
              <Text style={styles.characteristicsValue}>{data.spread}</Text>
            </View>
            <View style={styles.characteristicsRow}>
              <Text style={styles.characteristicsLabel}>Leaf Color</Text>
              <View style={styles.colorDotsContainer}>
                {data.leafColor?.map((color, idx) => (
                  <View key={idx} style={[styles.colorDot, { backgroundColor: color }]} />
                ))}
              </View>
            </View>
            <View style={styles.characteristicsRow}>
              <Text style={styles.characteristicsLabel}>Leaf Type</Text>
              <Text style={styles.characteristicsValue}>{data.leafType}</Text>
            </View>
            <View style={styles.characteristicsRow}>
              <Text style={styles.characteristicsLabel}>Planting Time</Text>
              <Text style={styles.characteristicsValue}>{data.plantingTime}</Text>
            </View>
          </>
        );
      case "flower":
        return (
          <>
            <View style={styles.characteristicsRow}>
              <Text style={styles.characteristicsLabel}>Color</Text>
              <View style={styles.colorDotsContainer}>
                {data.color?.map((color, idx) => (
                  <View key={idx} style={[styles.colorDot, { backgroundColor: color }]} />
                ))}
              </View>
            </View>
            <View style={styles.characteristicsRow}>
              <Text style={styles.characteristicsLabel}>Blooming Season</Text>
              <Text style={styles.characteristicsValue}>{data.bloomingSeason}</Text>
            </View>
            <View style={styles.characteristicsRow}>
              <Text style={styles.characteristicsLabel}>Fragrance</Text>
              <Text style={styles.characteristicsValue}>{data.fragrance}</Text>
            </View>
          </>
        );
      case "fruit":
        return (
          <View style={styles.characteristicsRow}>
            <Text style={styles.characteristicsLabel}>Produces Fruit</Text>
            <Text style={styles.characteristicsValue}>{data.hasFruit ? "Yes" : "No"}</Text>
          </View>
        );
      default:
        return null;
    }
  };

  const renderPlantItem = ({ item }) => (
    <View style={styles.plantCard}>
      {item.imageUrl && <Image source={item.imageUrl} style={styles.plantImage} />}
      <Text style={styles.plantName}>{item.name}</Text>
      <Text style={styles.plantDesc}>{item.description}</Text>
      <Text style={styles.plantDetails}>Toxicity to Humans: {item.toxicityToHumans}</Text>
      <Text style={styles.plantDetails}>Toxicity to Pets: {item.toxicityToPets}</Text>
      <Text style={styles.plantDetails}>Weed Potential: {item.weedPotential}</Text>
      <Text style={styles.plantDetails}>Distribution: {item.distribution}</Text>

      <View style={styles.characteristicsContainer}>
        <Text style={styles.characteristicsTitle}>Characteristics</Text>

        <View style={styles.tabsContainer}>
          {["matured", "flower", "fruit"].map((tab) => (
            <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
              <Text style={[styles.tabText, activeTab === tab && styles.activeTab]}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {renderCharacteristicContent(item.characteristics, activeTab)}
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="magnify" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          placeholder="Search plants or categories"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.shortcutContainer}>
        <TouchableOpacity style={styles.shortcutCard}>
          <Icon name="camera-outline" size={30} color="#00A86B" />
          <Text style={styles.shortcutLabel}>Identify</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shortcutCard}>
          <Icon name="medical-bag" size={30} color="#FFA500" />
          <Text style={styles.shortcutLabel}>Diagnose</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shortcutCard}>
          <Icon name="flower-tulip-outline" size={30} color="#00BCD4" />
          <Text style={styles.shortcutLabel}>My Garden</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.heroSection}>
        <Text style={styles.headerText}>Welcome to PlantCare 🌿</Text>
        <Text style={styles.subText}>Explore our curated plant collection below.</Text>
      </View>

      {!selectedCategory ? (
        <>
          <Text style={styles.sectionTitle}>Categories</Text>
          <FlatList
            data={categories}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.row}
            renderItem={renderCategoryItem}
            contentContainerStyle={styles.categoryGrid}
          />
        </>
      ) : (
        <>
          <View style={styles.backButtonContainer}>
            <TouchableOpacity onPress={() => setSelectedCategory(null)}>
              <Text style={styles.backButton}>← Back to Categories</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.sectionTitle}>Plants in {selectedCategory}</Text>
          <FlatList
            data={plantsByCategory[selectedCategory]}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderPlantItem}
            contentContainerStyle={styles.plantList}
          />
        </>
      )}
    </ScrollView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    backgroundColor: "#E8F4FF",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  shortcutContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 12,
    marginTop: 8,
    marginBottom: 20,
  },
  shortcutCard: {
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 16,
    borderRadius: 14,
    width: "30%",
    elevation: 2,
  },
  shortcutLabel: {
    marginTop: 6,
    fontSize: 14,
    color: "#333",
    textAlign: "center",
  },
  heroSection: {
    alignItems: "center",
    marginVertical: 20,
    marginBottom: 30,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0B5D51",
    textAlign: "center",
  },
  subText: {
    fontSize: 18,
    color: "#555",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginBottom: 10,
    color: "#0B5D51",
  },
  categoryGrid: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 15,
  },
  categoryCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    width: "48%",
    alignItems: "center",
    padding: 15,
    elevation: 2,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0B5D51",
    textAlign: "center",
    marginTop: 10,
  },
  backButtonContainer: {
    marginLeft: 20,
    marginBottom: 10,
  },
  backButton: {
    fontSize: 16,
    color: "#0B5D51",
  },
  plantList: {
    paddingHorizontal: 20,
  },
  plantCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 20,
    padding: 15,
    elevation: 2,
  },
  plantName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0B5D51",
  },
  plantDesc: {
    fontSize: 14,
    color: "#555",
  },
  plantDetails: {
    fontSize: 14,
    color: "#555",
    marginTop: 6,
  },
  plantImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 10,
  },
  characteristicsContainer: {
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 12,
    marginTop: 10,
  },
  characteristicsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  tabText: {
    fontSize: 16,
    color: '#999',
  },
  activeTab: {
    color: '#00A86B',
    borderBottomWidth: 2,
    borderColor: '#00A86B',
    paddingBottom: 4,
  },
  characteristicsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  characteristicsLabel: {
    fontSize: 14,
    color: '#777',
  },
  characteristicsValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  colorDotsContainer: {
    flexDirection: 'row',
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginLeft: 6,
  },
});
