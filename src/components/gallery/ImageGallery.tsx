import { useState } from 'react';
import Lightbox from './Lightbox';
import CategoryDescription from './CategoryDescription';

type FilterType = 'tree-work' | 'hedge-cutting' | 'stump-grinding' | 'site-clearance';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: FilterType;
}

const galleryImages: GalleryImage[] = [
  {
    id: 41,
    src: "/lovable-uploads/site-clearance-avant-loader.jpg",
    alt: "Green Avant loader preparing site clearance on muddy terrain with tracked wheels",
    category: "site-clearance"
  },
  {
    id: 42,
    src: "/lovable-uploads/site-clearance-jcb-telehandler.jpg",
    alt: "JCB telehandler machinery used for heavy site clearance and material handling",
    category: "site-clearance"
  },
  {
    id: 43,
    src: "/lovable-uploads/site-clearance-large-chipper.jpg",
    alt: "Large industrial wood chipper and transport truck for commercial site clearance operations",
    category: "site-clearance"
  },
  {
    id: 44,
    src: "/lovable-uploads/site-clearance-timber-logs.jpg",
    alt: "Large timber log pile from site clearance ready for processing and removal",
    category: "site-clearance"
  },
  {
    id: 45,
    src: "/lovable-uploads/site-clearance-tractor-field.jpg",
    alt: "Agricultural tractor with attachment clearing field for site development",
    category: "site-clearance"
  },
  {
    id: 46,
    src: "/lovable-uploads/site-clearance-cleared-land.jpg",
    alt: "Successfully cleared land site ready for development with clean finish",
    category: "site-clearance"
  },
  {
    id: 47,
    src: "/lovable-uploads/site-clearance-stump-mulcher.jpg",
    alt: "Yellow tracked stump mulcher clearing vegetation for site preparation",
    category: "site-clearance"
  },
  {
    id: 48,
    src: "/lovable-uploads/site-clearance-red-mulcher.jpg",
    alt: "Red industrial mulcher equipment for efficient site clearance and vegetation removal",
    category: "site-clearance"
  },
  {
    id: 49,
    src: "/lovable-uploads/site-clearance-roadside-tractor.jpg",
    alt: "Heavy-duty tractor with roadside mulcher attachment for commercial vegetation clearance",
    category: "site-clearance"
  },
  {
    id: 59,
    src: "/lovable-uploads/site-clearance-blower-cleanup.jpg",
    alt: "Worker with backpack blower in high-vis gear clearing debris on commercial site",
    category: "site-clearance"
  },
  {
    id: 60,
    src: "/lovable-uploads/site-clearance-avant-mulcher.jpg",
    alt: "Green Avant loader with mulcher attachment clearing overgrown vegetation on development site",
    category: "site-clearance"
  },
  {
    id: 61,
    src: "/lovable-uploads/site-clearance-plate-compactor.jpg",
    alt: "Operator using plate compactor to finish cleared ground with safety barriers on site",
    category: "site-clearance"
  },
  {
    id: 78,
    src: "/lovable-uploads/site-clearance-commercial-cleanup.jpg",
    alt: "Workers in high-vis gear clearing and sweeping debris outside commercial building with Dingo loader during site clearance",
    category: "site-clearance"
  },
  {
    id: 79,
    src: "/lovable-uploads/site-clearance-commercial-ladder.jpg",
    alt: "Commercial site clearance with ladder work removing overgrown vegetation from building exterior",
    category: "site-clearance"
  },
  {
    id: 80,
    src: "/lovable-uploads/site-clearance-van-loading.jpg",
    alt: "Reeves tree surgeon loading green waste into van during commercial site clearance operation",
    category: "site-clearance"
  },
  {
    id: 81,
    src: "/lovable-uploads/site-clearance-turfing-reinstatement.jpg",
    alt: "Site clearance and turfing reinstatement at commercial property with wheelbarrow of turf rolls and worker in hi-vis",
    category: "site-clearance"
  },
  {
    id: 82,
    src: "/lovable-uploads/site-clearance-skip-clearance.jpg",
    alt: "Commercial site clearance with skip and ground works showing cleared vegetation and debris removal",
    category: "site-clearance"
  },
  {
    id: 88,
    src: "/lovable-uploads/site-clearance-turfing-laying.jpg",
    alt: "Worker in hi-vis laying turf rolls during commercial site reinstatement with wheelbarrow and rake on overcast day",
    category: "site-clearance"
  },
  {
    id: 125,
    src: "/lovable-uploads/site-clearance-commercial-hedge-removal.jpg",
    alt: "Arborist in high-vis clearing overgrown commercial hedge and brush at development site",
    category: "site-clearance"
  },
  {
    id: 133,
    src: "/lovable-uploads/site-clearance-residential-land-clearing.jpg",
    alt: "Residential land clearing and vegetation removal with wood chip mulch at bungalow property",
    category: "site-clearance"
  },
  {
    id: 2,
    src: "/lovable-uploads/e4587469-be1f-4959-a258-62dd2b8a8834.png",
    alt: "Professional stump grinding with specialized equipment",
    category: "stump-grinding"
  },
  {
    id: 3,
    src: "/lovable-uploads/56fdf6b5-eb05-4c88-a572-ff26ba94815d.png",
    alt: "Professional team conducting large tree removal project",
    category: "tree-work"
  },
  {
    id: 39,
    src: "/lovable-uploads/hedge-cutting-commercial-corner.jpg",
    alt: "Professional commercial hedge cutting on large corner property maintaining street-facing boundaries",
    category: "hedge-cutting"
  },
  {
    id: 40,
    src: "/lovable-uploads/hedge-cutting-field-boundary.jpg",
    alt: "Hedge maintenance and field boundary clearance creating clean property lines",
    category: "hedge-cutting"
  },
  {
    id: 21,
    src: "/lovable-uploads/604caddf-d588-456f-bcfc-c2adc4f573ce.png",
    alt: "High precision hedge cutting for residential garden privacy screening",
    category: "hedge-cutting"
  },
  {
    id: 35,
    src: "/lovable-uploads/hedge-cutting-formal-topiary.jpg",
    alt: "Expertly maintained formal hedge boundary with decorative topiary spheres and precise geometric shaping",
    category: "hedge-cutting"
  },
  {
    id: 22,
    src: "/lovable-uploads/6af2eb66-0e8a-4581-ac67-2577fa014d13.png",
    alt: "Professional hedge trimming creating clean lines along curved driveway",
    category: "hedge-cutting"
  },
  {
    id: 23,
    src: "/lovable-uploads/76bf1fbb-003e-40a2-af1f-e627f5411cd7.png",
    alt: "Garden hedge maintenance with perfect alignment and height consistency",
    category: "hedge-cutting"
  },
  {
    id: 24,
    src: "/lovable-uploads/55d771ea-e235-4eb0-9031-6cf6683ef8e2.png",
    alt: "Residential hedge cutting service maintaining garden boundaries and privacy",
    category: "hedge-cutting"
  },
  {
    id: 25,
    src: "/lovable-uploads/726bb765-2385-438a-8916-310c16eb4e96.png",
    alt: "Large scale hedge trimming project with consistent height and clean finish",
    category: "hedge-cutting"
  },
  {
    id: 26,
    src: "/lovable-uploads/6038d913-ec9b-4424-b8ab-1cd131051cf5.png",
    alt: "Commercial hedge cutting for sports facility perimeter screening",
    category: "hedge-cutting"
  },
  {
    id: 53,
    src: "/lovable-uploads/hedge-cutting-formal-estate.jpg",
    alt: "Professionally maintained formal estate hedge with decorative gateway and ornamental pillars",
    category: "hedge-cutting"
  },
  {
    id: 63,
    src: "/lovable-uploads/hedge-cutting-winter-rural.jpg",
    alt: "Professional hedge trimming in winter conditions with worker in high-vis gear maintaining rural boundary hedge",
    category: "hedge-cutting"
  },
  {
    id: 64,
    src: "/lovable-uploads/hedge-cutting-cherry-picker.jpg",
    alt: "Professional hedge maintenance using cherry picker truck with safety cones on roadside for tall boundary hedge trimming",
    category: "hedge-cutting"
  },
  {
    id: 66,
    src: "/lovable-uploads/hedge-cutting-commercial-parking.jpg",
    alt: "Professionally maintained commercial hedge bordering parking lot with neat squared finish on sunny winter day",
    category: "hedge-cutting"
  },
  {
    id: 68,
    src: "/lovable-uploads/hedge-cutting-laurel-boundary.jpg",
    alt: "Freshly trimmed laurel hedge along boundary path with mulched base and neat professional finish",
    category: "hedge-cutting"
  },
  {
    id: 69,
    src: "/lovable-uploads/hedge-cutting-pub-garden.jpg",
    alt: "Professionally trimmed boundary hedge at pub beer garden with picnic tables on overcast winter day",
    category: "hedge-cutting"
  },
  {
    id: 73,
    src: "/lovable-uploads/hedge-cutting-roadside-boundary.jpg",
    alt: "Professional roadside hedge maintenance with neatly trimmed rural boundary hedge along country lane",
    category: "hedge-cutting"
  },
  {
    id: 83,
    src: "/lovable-uploads/hedge-cutting-harvester-boundary.jpg",
    alt: "Commercial hedge boundary maintenance at Harvester restaurant property with mature evergreen trees",
    category: "hedge-cutting"
  },
  {
    id: 92,
    src: "/lovable-uploads/hedge-cutting-formal-topiary-driveway.jpg",
    alt: "Professionally shaped columnar conifer hedges lining residential driveway with precise topiary finish",
    category: "hedge-cutting"
  },
  {
    id: 93,
    src: "/lovable-uploads/hedge-cutting-garden-boundary.jpg",
    alt: "Neatly trimmed long garden boundary hedge viewed from wooden gate with manicured lawn",
    category: "hedge-cutting"
  },
  {
    id: 94,
    src: "/lovable-uploads/hedge-cutting-columnar-driveway.jpg",
    alt: "Row of expertly maintained columnar hedges along driveway with uniform rounded tops and clean finish",
    category: "hedge-cutting"
  },
  {
    id: 102,
    src: "/lovable-uploads/hedge-cutting-garden-topiary.jpg",
    alt: "Large formal garden hedge professionally shaped with clean flat top and sides in residential setting",
    category: "hedge-cutting"
  },
  {
    id: 103,
    src: "/lovable-uploads/hedge-cutting-commercial-carpark.jpg",
    alt: "Commercial car park hedge maintenance with neatly trimmed low boundary hedge alongside apartment building",
    category: "hedge-cutting"
  },
  {
    id: 104,
    src: "/lovable-uploads/hedge-cutting-pub-garden.jpg",
    alt: "Professionally trimmed boundary hedge at pub beer garden with picnic tables on overcast winter day",
    category: "hedge-cutting"
  },
  {
    id: 105,
    src: "/lovable-uploads/hedge-cutting-harvester-topiary.jpg",
    alt: "Rounded topiary hedge shaping at Harvester restaurant commercial property entrance",
    category: "hedge-cutting"
  },
  {
    id: 106,
    src: "/lovable-uploads/hedge-cutting-residential-boundary.jpg",
    alt: "Long residential boundary hedge neatly trimmed to uniform height with mature conifers in garden setting",
    category: "hedge-cutting"
  },
  {
    id: 107,
    src: "/lovable-uploads/hedge-cutting-fence-overgrowth.jpg",
    alt: "Hedge growing over wooden fence panel requiring professional reduction and height management",
    category: "hedge-cutting"
  },
  {
    id: 108,
    src: "/lovable-uploads/hedge-cutting-premier-inn.jpg",
    alt: "Commercial hedge maintenance at Premier Inn hotel property with low boundary hedge along car park",
    category: "hedge-cutting"
  },
  {
    id: 109,
    src: "/lovable-uploads/hedge-cutting-premier-inn-entrance.jpg",
    alt: "Commercial hedge trimming at Premier Inn entrance with maintained boundary hedging along roadside",
    category: "hedge-cutting"
  },
  {
    id: 110,
    src: "/lovable-uploads/hedge-cutting-carpark-island.jpg",
    alt: "Car park island hedge maintenance with safety cones during commercial hedge cutting operation",
    category: "hedge-cutting"
  },
  {
    id: 111,
    src: "/lovable-uploads/hedge-cutting-carpark-boundary.jpg",
    alt: "Overgrown commercial car park boundary hedge requiring professional trimming and restoration",
    category: "hedge-cutting"
  },
  {
    id: 112,
    src: "/lovable-uploads/hedge-cutting-residential-boundary-tall.jpg",
    alt: "Tall residential boundary hedge neatly trimmed alongside garden lawn and outbuilding",
    category: "hedge-cutting"
  },
  {
    id: 113,
    src: "/lovable-uploads/hedge-cutting-pub-laurel-boundary.jpg",
    alt: "Professionally maintained laurel hedge boundary at pub beer garden with outdoor seating area",
    category: "hedge-cutting"
  },
  {
    id: 114,
    src: "/lovable-uploads/hedge-cutting-commercial-laurel-divider.jpg",
    alt: "Commercial laurel hedge divider in car park freshly trimmed to uniform height",
    category: "hedge-cutting"
  },
  {
    id: 115,
    src: "/lovable-uploads/hedge-cutting-pub-topiary-balls.jpg",
    alt: "Decorative topiary ball hedges shaped at commercial pub entrance with rounded finish",
    category: "hedge-cutting"
  },
  {
    id: 116,
    src: "/lovable-uploads/hedge-cutting-industrial-perimeter.jpg",
    alt: "Long industrial perimeter hedge maintained along warehouse boundary fencing",
    category: "hedge-cutting"
  },
  {
    id: 117,
    src: "/lovable-uploads/hedge-cutting-pub-garden-shaped.jpg",
    alt: "Shaped hedges at pub garden with neat contoured finish and outdoor seating area",
    category: "hedge-cutting"
  },
  {
    id: 118,
    src: "/lovable-uploads/hedge-cutting-garden-privacy-wall.jpg",
    alt: "Large garden privacy hedge wall trimmed to uniform height beside residential property",
    category: "hedge-cutting"
  },
  {
    id: 119,
    src: "/lovable-uploads/hedge-cutting-lidl-boundary.jpg",
    alt: "Commercial laurel hedge boundary maintenance alongside Lidl supermarket car park",
    category: "hedge-cutting"
  },
  {
    id: 120,
    src: "/lovable-uploads/hedge-cutting-rural-boundary-winter.jpg",
    alt: "Rural boundary hedge and tree maintenance in winter with wood chip mulch ground clearance",
    category: "hedge-cutting"
  },
  {
    id: 121,
    src: "/lovable-uploads/hedge-cutting-commercial-office-frontage.jpg",
    alt: "Commercial office building frontage hedge and ornamental tree maintenance with neat low border",
    category: "hedge-cutting"
  },
  {
    id: 122,
    src: "/lovable-uploads/hedge-cutting-residential-conifer-trim.jpg",
    alt: "Arborist with backpack blower maintaining tall residential conifer hedge in back garden",
    category: "hedge-cutting"
  },
  {
    id: 123,
    src: "/lovable-uploads/hedge-cutting-commercial-entrance-topiary.jpg",
    alt: "Neatly shaped commercial entrance topiary hedge at retail car park with rounded profile",
    category: "hedge-cutting"
  },
  {
    id: 124,
    src: "/lovable-uploads/hedge-cutting-commercial-conifer-screen.jpg",
    alt: "Long commercial conifer screen hedge professionally trimmed along car park boundary",
    category: "hedge-cutting"
  },
  {
    id: 126,
    src: "/lovable-uploads/hedge-cutting-pub-beer-garden-boundary.jpg",
    alt: "Neatly trimmed tall laurel hedge boundary at pub beer garden with outdoor seating area",
    category: "hedge-cutting"
  },
  {
    id: 127,
    src: "/lovable-uploads/hedge-cutting-driveway-conifer-laurel.jpg",
    alt: "Professionally maintained tall conifer and laurel hedges along residential driveway",
    category: "hedge-cutting"
  },
  {
    id: 128,
    src: "/lovable-uploads/hedge-cutting-commercial-frontage-topiary.jpg",
    alt: "Shaped topiary box hedging maintained at commercial Tudor-style building frontage",
    category: "hedge-cutting"
  },
  {
    id: 129,
    src: "/lovable-uploads/hedge-cutting-commercial-laurel-corner.jpg",
    alt: "Commercial laurel hedge neatly trimmed around corner boundary at brick building",
    category: "hedge-cutting"
  },
  {
    id: 130,
    src: "/lovable-uploads/hedge-cutting-industrial-depot-boundary.jpg",
    alt: "Long industrial depot boundary hedge trimmed along car park at logistics facility",
    category: "hedge-cutting"
  },
  {
    id: 131,
    src: "/lovable-uploads/hedge-cutting-toby-carvery-entrance.jpg",
    alt: "Commercial entrance hedge maintenance at Toby Carvery and Premier Inn site",
    category: "hedge-cutting"
  },
  {
    id: 132,
    src: "/lovable-uploads/hedge-cutting-car-park-boundary-trim.jpg",
    alt: "Tall boundary hedge professionally trimmed along commercial car park with cherry picker on site",
    category: "hedge-cutting"
  },
  {
    id: 134,
    src: "/lovable-uploads/hedge-cutting-miller-carter.jpg",
    alt: "Freshly trimmed laurel hedge boundary at Miller & Carter Steakhouse with neat reduction and grass clearance",
    category: "hedge-cutting"
  },
  {
    id: 28,
    src: "/lovable-uploads/7e2f3335-fe8b-4a3b-966a-60211393a667.png",
    alt: "Professional red stump grinder machine for efficient stump removal",
    category: "stump-grinding"
  },
  {
    id: 29,
    src: "/lovable-uploads/20ee072d-bb69-4ba9-bf8d-ca88989ae2e9.png",
    alt: "Tracked stump grinding equipment in operation for precise stump removal",
    category: "stump-grinding"
  },
  {
    id: 36,
    src: "/lovable-uploads/stump-grinding-residential-1.jpg",
    alt: "Professional stump grinding service in residential garden using specialized Bandit equipment",
    category: "stump-grinding"
  },
  {
    id: 37,
    src: "/lovable-uploads/stump-grinding-residential-2.jpg",
    alt: "Stump grinding operation in confined residential space with safety barriers and professional equipment",
    category: "stump-grinding"
  },
  {
    id: 38,
    src: "/lovable-uploads/stump-grinding-urban-location.jpg",
    alt: "Urban stump removal project with tracked stump grinder and proper safety cordoning",
    category: "stump-grinding"
  },
  {
    id: 201,
    src: "/lovable-uploads/stump-grinding-bandit-sg40.jpg",
    alt: "Bandit SG-40 tracked stump grinder with red and white safety barriers grinding stump in residential alleyway",
    category: "stump-grinding"
  },
  {
    id: 202,
    src: "/lovable-uploads/stump-grinding-bandit-streetside.jpg",
    alt: "Bandit stump grinder with red and white safety barriers removing large stump on residential street verge",
    category: "stump-grinding"
  },
  {
    id: 200,
    src: "/lovable-uploads/stump-grinding-garden-roots.jpg",
    alt: "Arborist in high-vis with safety barriers grinding large tree stump and exposed roots in residential garden",
    category: "stump-grinding"
  },
  {
    id: 87,
    src: "/lovable-uploads/stump-grinding-honda-grinder.jpg",
    alt: "Honda-powered stump grinder removing tree roots with wood chip mulch in confined garden space",
    category: "stump-grinding"
  },
  {
    id: 91,
    src: "/lovable-uploads/stump-grinding-bandit-tracked.jpg",
    alt: "Operator in hi-vis using green Bandit tracked stump grinder to remove large stump in residential garden on sunny day",
    category: "stump-grinding"
  },
  {
    id: 203,
    src: "/lovable-uploads/stump-grinding-kohler-command.jpg",
    alt: "Kohler Command Pro powered stump grinder with red and white safety barriers grinding large oak stump in commercial courtyard",
    category: "stump-grinding"
  },
  {
    id: 204,
    src: "/lovable-uploads/stump-grinding-fence-barrier.jpg",
    alt: "Freshly ground tree stump enclosed by red and white safety barriers next to garden fence after stump grinding",
    category: "stump-grinding"
  },
  {
    id: 205,
    src: "/lovable-uploads/stump-grinding-bandit-sg40-driveway.jpg",
    alt: "Bandit SG-40 tracked stump grinder positioned on residential driveway with safety barriers and Kohler engine",
    category: "stump-grinding"
  },
  {
    id: 13,
    src: "/lovable-uploads/6ceae57f-a69a-4627-a5a3-9db71ea5b891.png",
    alt: "Professional tree surgeons conducting chainsaw work with safety equipment and team coordination",
    category: "tree-work"
  },
  {
    id: 16,
    src: "/lovable-uploads/7e5b8a79-8efc-43ed-a8c9-7e342e0977ab.png",
    alt: "Skilled arborist performing precise tree climbing and sectional tree removal near residential property",
    category: "tree-work"
  },
  {
    id: 17,
    src: "/lovable-uploads/2e6c5c70-5f8a-44c2-9819-2955f8136056.png",
    alt: "Professional arborist performing precision tree work at height on mature Cedar tree",
    category: "tree-work"
  },
  {
    id: 147,
    src: "/lovable-uploads/tree-work-aerial-dismantle-village.jpg",
    alt: "Climber's POV aerial view dismantling a tree section by section above a village with sports field in the distance",
    category: "tree-work"
  },
  {
    id: 30,
    src: "/lovable-uploads/tree-work-stump-removal.jpg",
    alt: "Professional tree stump removal operation with specialized equipment and machinery",
    category: "tree-work"
  },
  {
    id: 32,
    src: "/lovable-uploads/tree-work-large-removal.jpg",
    alt: "Large tree removal project with professional team and safety protocols in residential area",
    category: "tree-work"
  },
  {
    id: 33,
    src: "/lovable-uploads/tree-work-equipment-transport.jpg",
    alt: "Specialized tree removal equipment transporting large timber sections on tracked machinery",
    category: "tree-work"
  },
  {
    id: 34,
    src: "/lovable-uploads/tree-work-trunk-cutting.jpg",
    alt: "Professional tree surgeon using chainsaw for precise trunk sectioning with proper safety gear",
    category: "tree-work"
  },
  {
    id: 50,
    src: "/lovable-uploads/tree-work-cherry-picker-pruning.jpg",
    alt: "Professional arborist using cherry picker MEWP for high-level tree pruning and maintenance",
    category: "tree-work"
  },
  {
    id: 51,
    src: "/lovable-uploads/tree-work-timber-removal.jpg",
    alt: "Large timber sections being loaded for removal during professional tree surgery operation",
    category: "tree-work"
  },
  {
    id: 52,
    src: "/lovable-uploads/tree-work-large-trunk-removal.jpg",
    alt: "Professional tree surgery team with Avant loader and chainsaw removing large oak trunk on woodland path",
    category: "tree-work"
  },
  {
    id: 54,
    src: "/lovable-uploads/tree-work-aerial-residential.jpg",
    alt: "Aerial view of tree surgeon performing climbing work in residential garden with professional rigging equipment",
    category: "tree-work"
  },
  {
    id: 56,
    src: "/lovable-uploads/tree-work-climbing-rigging.jpg",
    alt: "Professional arborist climbing with chainsaw and rigging lines during residential tree dismantling operation",
    category: "tree-work"
  },
  {
    id: 57,
    src: "/lovable-uploads/tree-work-climbing-dismantling.jpg",
    alt: "Tree surgeon climbing trunk with rigging lines during residential tree dismantling with dramatic cloudy sky",
    category: "tree-work"
  },
  {
    id: 58,
    src: "/lovable-uploads/tree-work-base-cutting.jpg",
    alt: "Arborist with safety helmet and chainsaw making base cut on large tree trunk in residential garden",
    category: "tree-work"
  },
  {
    id: 62,
    src: "/lovable-uploads/tree-work-winter-chipper.jpg",
    alt: "Professional winter tree work operation with wood chipper, safety cones and arborist in snowy conditions",
    category: "tree-work"
  },
  {
    id: 65,
    src: "/lovable-uploads/tree-work-winter-climbing.jpg",
    alt: "Arborist climbing tall deciduous tree during winter pruning work in residential garden at dusk",
    category: "tree-work"
  },
  {
    id: 67,
    src: "/lovable-uploads/tree-work-residential-pruning.jpg",
    alt: "Professional tree pruning operation with cherry picker on large deciduous trees in residential driveway on sunny winter day",
    category: "tree-work"
  },
  {
    id: 135,
    src: "/lovable-uploads/tree-work-oak-dismantle-climber.jpg",
    alt: "Climbing arborist sectionally dismantling tall oak tree with chainsaw above woodland canopy",
    category: "tree-work"
  },
  {
    id: 136,
    src: "/lovable-uploads/tree-work-tall-oak-dismantle.jpg",
    alt: "Reeves arborist climbing and sectionally dismantling tall dead oak tree with chainsaw above West Midlands woodland",
    category: "tree-work"
  },
  {
    id: 137,
    src: "/lovable-uploads/tree-work-oak-topping-aerial.jpg",
    alt: "Certified arborist topping a tall oak with chainsaw during aerial dismantle above West Midlands woodland",
    category: "tree-work"
  },
  {
    id: 70,
    src: "/lovable-uploads/tree-work-ground-chainsaw.jpg",
    alt: "Arborist in hi-vis gear processing felled branches with chainsaw at commercial car park during winter tree work",
    category: "tree-work"
  },
  {
    id: 71,
    src: "/lovable-uploads/tree-work-cherry-picker-commercial.jpg",
    alt: "Cherry picker truck with safety barrier and tree cutting sign during commercial tree surgery operation near office building",
    category: "tree-work"
  },
  {
    id: 72,
    src: "/lovable-uploads/tree-work-elevated-platform.jpg",
    alt: "Two arborists on elevated work platform pruning deciduous tree branches at height with residential buildings in background",
    category: "tree-work"
  },
  {
    id: 74,
    src: "/lovable-uploads/tree-work-log-carrying.jpg",
    alt: "Reeves tree surgeon carrying large cut log sections after tree felling with hi-vis safety gear",
    category: "tree-work"
  },
  {
    id: 75,
    src: "/lovable-uploads/tree-work-night-chipper.jpg",
    alt: "Emergency tree work at night with wood chipper and floodlights clearing storm-damaged trees",
    category: "tree-work"
  },
  {
    id: 76,
    src: "/lovable-uploads/tree-work-pollarded-tree.jpg",
    alt: "Professionally pollarded street tree with clean cuts and structured canopy framework in urban setting",
    category: "tree-work"
  },
  {
    id: 77,
    src: "/lovable-uploads/tree-work-timber-truck.jpg",
    alt: "Truck loaded with freshly cut timber logs from professional tree removal and clearance operation",
    category: "tree-work"
  },
  {
    id: 84,
    src: "/lovable-uploads/tree-work-van-loading-debris.jpg",
    alt: "Reeves tree surgeon in hi-vis loading palm and vegetation debris into van during commercial tree clearance",
    category: "tree-work"
  },
  {
    id: 85,
    src: "/lovable-uploads/tree-work-carrying-palm-debris.jpg",
    alt: "Arborist carrying large palm fronds and debris during commercial tree removal at Toby Carvery",
    category: "tree-work"
  },
  {
    id: 86,
    src: "/lovable-uploads/tree-work-stump-extraction.jpg",
    alt: "Tree surgeon using mattock to extract plant stump from fenced garden bed during roadside clearance work",
    category: "tree-work"
  },
  {
    id: 89,
    src: "/lovable-uploads/tree-work-aerial-chainsaw-cutting.jpg",
    alt: "Arborist with orange safety helmet using chainsaw to section large pine trunk at height with climbing harness and rigging gear",
    category: "tree-work"
  },
  {
    id: 90,
    src: "/lovable-uploads/tree-work-ground-log-sectioning.jpg",
    alt: "Tree surgeon in safety gear using Husqvarna chainsaw to cross-cut large felled trunk into manageable log sections",
    category: "tree-work"
  },
  {
    id: 95,
    src: "/lovable-uploads/tree-work-churchyard-climbing.jpg",
    alt: "Arborist in orange safety gear climbing mature oak tree in churchyard for crown reduction work on sunny day",
    category: "tree-work"
  },
  {
    id: 96,
    src: "/lovable-uploads/tree-work-churchyard-safety-sign.jpg",
    alt: "Tree cutting warning sign with arborist climbing large oak and ground crew with safety barriers in churchyard",
    category: "tree-work"
  },
  {
    id: 97,
    src: "/lovable-uploads/tree-work-churchyard-dual-climbers.jpg",
    alt: "Two arborists in hi-vis climbing large mature oak tree for crown work with safety cordoning in churchyard grounds",
    category: "tree-work"
  },
  {
    id: 98,
    src: "/lovable-uploads/tree-work-churchyard-dusk-climbing.jpg",
    alt: "Arborist silhouetted climbing large oak tree at dusk near church building with ladder access and safety rigging",
    category: "tree-work"
  },
  {
    id: 99,
    src: "/lovable-uploads/tree-work-churchyard-team-climbing.jpg",
    alt: "Team of two arborists in orange safety gear climbing and pruning large oak with rigging lines in churchyard setting",
    category: "tree-work"
  },
  {
    id: 100,
    src: "/lovable-uploads/tree-work-aerial-team-parkland.jpg",
    alt: "Aerial view of multiple arborists carrying out large tree work in parkland with climbing lines, support van and ground crew",
    category: "tree-work"
  },
  {
    id: 101,
    src: "/lovable-uploads/tree-work-parkland-climbing-pruning.jpg",
    alt: "Arborist in orange hi-vis climbing and pruning large deciduous tree in parkland with rigging lines on sunny spring day",
    category: "tree-work"
  },
  {
    id: 134,
    src: "/lovable-uploads/tree-work-fallen-tree-assessment.jpg",
    alt: "Arborist in hi-vis assessing large fallen tree trunk for safe removal in overgrown woodland area",
    category: "tree-work"
  },
  {
    id: 135,
    src: "/lovable-uploads/site-clearance-landscaping-machinery.jpg",
    alt: "Green telehandler lifting bulk bags of topsoil during landscaping and site preparation with shaped shrubs and timber edging",
    category: "site-clearance"
  },
  {
    id: 136,
    src: "/lovable-uploads/site-clearance-hedge-planting-preparation.jpg",
    alt: "Worker in hi-vis preparing hedge plants along fence line for new boundary planting during site clearance project",
    category: "site-clearance"
  },
  {
    id: 137,
    src: "/lovable-uploads/tree-work-aerial-dismantling-residential.jpg",
    alt: "Aerial GoPro view from top of large tree during residential dismantling showing arborist working below in overgrown garden",
    category: "tree-work"
  },
  {
    id: 138,
    src: "/lovable-uploads/tree-work-aerial-chainsaw-dismantling.jpg",
    alt: "POV GoPro shot of arborist with Stihl chainsaw dismantling large tree at height overlooking residential gardens",
    category: "tree-work"
  },
  {
    id: 139,
    src: "/lovable-uploads/tree-work-large-stump-chainsaw.jpg",
    alt: "Large oak stump freshly felled with Stihl chainsaw showing cross-section rings in residential garden",
    category: "tree-work"
  },
  {
    id: 140,
    src: "/lovable-uploads/tree-work-travelodge-commercial.jpg",
    alt: "Commercial tree work at Travelodge hotel showing large deciduous tree assessment before removal",
    category: "tree-work"
  },
  {
    id: 141,
    src: "/lovable-uploads/tree-work-stihl-aerial-dismantling.jpg",
    alt: "Aerial tree dismantling with Stihl MS 500i chainsaw on large trunk section in residential street",
    category: "tree-work"
  },
  {
    id: 145,
    src: "/lovable-uploads/tree-work-conifer-mewp-commercial.jpg",
    alt: "Tree surgeon dismantling tall conifer using MEWP cherry picker at commercial premises in West Midlands",
    category: "tree-work"
  },
  {
    id: 146,
    src: "/lovable-uploads/tree-work-climber-summit-dismantle.jpg",
    alt: "Reeves Tree Surgeons climber at the top of a conifer dismantle with countryside views during sectional felling",
    category: "tree-work"
  },
  {
    id: 142,
    src: "/lovable-uploads/site-clearance-harvester-planting.jpg",
    alt: "Commercial planting and landscaping work at Harvester restaurant with raised flower beds and shrubs",
    category: "site-clearance"
  },
  {
    id: 143,
    src: "/lovable-uploads/site-clearance-turfing-commercial-1.jpg",
    alt: "Fresh turf installation at commercial property with picnic seating area and newly laid lawn",
    category: "site-clearance"
  },
  {
    id: 144,
    src: "/lovable-uploads/site-clearance-turfing-commercial-2.jpg",
    alt: "Completed commercial turfing and reinstatement around building perimeter with new grass areas",
    category: "site-clearance"
  }
];

const filterOptions = [
  { key: 'tree-work' as FilterType, label: 'Tree Work' },
  { key: 'hedge-cutting' as FilterType, label: 'Hedge Cutting' },
  { key: 'stump-grinding' as FilterType, label: 'Stump Grinding' },
  { key: 'site-clearance' as FilterType, label: 'Site Clearance' }
];

const ImageGallery = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('tree-work');
  const [lightboxImage, setLightboxImage] = useState<number | null>(null);

  const filteredImages = galleryImages.filter(img => img.category === activeFilter);

  const openLightbox = (imageId: number) => {
    setLightboxImage(imageId);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (lightboxImage === null) return;
    
    const currentIndex = filteredImages.findIndex(img => img.id === lightboxImage);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    } else {
      newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    }
    
    setLightboxImage(filteredImages[newIndex].id);
  };

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-muted/30">
      <div className="container mx-auto max-w-7xl px-4 lg:px-6">
        
        {/* Section Heading */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4 leading-tight">
            Explore Our Projects
          </h2>
          <div className="w-24 h-1 mx-auto mb-6" style={{ backgroundColor: 'hsl(var(--primary))' }} />
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Browse through our recent tree surgery, hedge maintenance, stump grinding, and site clearance projects. Every job demonstrates our commitment to quality, safety, and customer satisfaction across the West Midlands.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10 lg:mb-12">
          {filterOptions.map((option, index) => (
            <button
              key={option.key}
              onClick={() => setActiveFilter(option.key)}
              className={`px-6 lg:px-8 py-3 rounded-full font-semibold transition-all duration-300 animate-fade-in-up ${
                activeFilter === option.key
                  ? 'bg-primary text-primary-foreground shadow-md hover:shadow-lg'
                  : 'bg-background text-foreground border-2 border-primary/40 hover:border-primary hover:bg-primary/5'
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Category Description Card */}
        <CategoryDescription category={activeFilter} />

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer animate-fade-in"
              onClick={() => openLightbox(image.id)}
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <div className="aspect-video">
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* No results message */}
        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No images found for the selected category.
            </p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxImage !== null && (
        <Lightbox
          images={filteredImages}
          currentImageId={lightboxImage}
          onClose={closeLightbox}
          onNavigate={navigateLightbox}
        />
      )}
    </section>
  );
};

export default ImageGallery;